import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

// Habilitar o bodyParser do Next.js para processar JSON
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

// Criar cliente Supabase com service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Configurações do Supabase ausentes:', {
    url: !!supabaseUrl,
    key: !!supabaseKey
  });
  throw new Error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const uploadImageToSupabase = async (base64Data, fileName) => {
  try {
    console.log('Iniciando upload para Supabase...');
    
    // Remover o prefixo do base64
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string format');
    }
    
    const imageType = matches[1];
    const imageData = matches[2];
    const buffer = Buffer.from(imageData, 'base64');
    const fullFileName = `${fileName}.jpg`;

    console.log('Detalhes do arquivo:', {
      nome: fullFileName,
      tipo: imageType,
      tamanho: buffer.length
    });

    // Upload direto usando service role
    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(fullFileName, buffer, {
        contentType: imageType,
        upsert: true
      });

    if (error) {
      console.error('Erro no upload:', error);
      throw error;
    }

    console.log('Upload bem sucedido:', data);

    // Gerar URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fullFileName);

    console.log('URL pública gerada:', publicUrl);
    return publicUrl;

  } catch (error) {
    console.error('Erro no upload:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  console.log("=== Início do processamento da requisição ===");
  console.log("Método:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      console.log('Usuário não autenticado');
      return res.status(401).json({ error: "Not authenticated" });
    }

    console.log('Usuário autenticado:', session.user.email);

    const { imageData } = req.body;
    if (!imageData) {
      console.log('Nenhuma imagem fornecida');
      return res.status(400).json({ error: "No image data provided" });
    }

    if (!imageData.startsWith('data:image/')) {
      console.log('Formato de imagem inválido');
      return res.status(400).json({ error: "Invalid image format" });
    }

    try {
      const fileName = `user_${session.user.email.split('@')[0]}_${Date.now()}`;
      console.log('Tentando upload com nome:', fileName);
      
      const imageUrl = await uploadImageToSupabase(imageData, fileName);
      console.log('URL da imagem após upload:', imageUrl);
      
      await prisma.user.update({
        where: { email: session.user.email },
        data: { profileImage: imageUrl }
      });
      
      console.log('Perfil atualizado com sucesso');
      
      return res.status(200).json({
        success: true,
        imageUrl: imageUrl
      });
      
    } catch (uploadError) {
      console.error('Erro no upload:', uploadError);
      return res.status(500).json({
        error: "Upload failed",
        message: uploadError.message
      });
    }
  } catch (error) {
    console.error('Erro do servidor:', error);
    return res.status(500).json({
      error: "Server error",
      message: error.message
    });
  } finally {
    await prisma.$disconnect();
    console.log("=== Fim do processamento da requisição ===");
  }
} 