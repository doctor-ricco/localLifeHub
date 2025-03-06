export const validatePhone = (phone) => {
  // Remove todos os caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');

  // Regex para validar números de telefone internacionais
  // Formato: +[código do país][número]
  // Para Brasil: +55[DDD][número]
  const phoneRegex = {
    // Formato Brasil: +55 + DDD (2 dígitos) + número (8-9 dígitos)
    BR: /^55[1-9][1-9]\d{8,9}$/,
    // Formato internacional genérico: + código do país (1-3 dígitos) + número (6-12 dígitos)
    international: /^\d{1,3}\d{6,12}$/
  };

  // Se começa com 55, valida como número brasileiro
  if (cleanPhone.startsWith('55')) {
    if (!phoneRegex.BR.test(cleanPhone)) {
      throw new Error('Número brasileiro inválido. Formato: +55 (DDD) XXXXX-XXXX');
    }
  } else {
    // Valida como número internacional
    if (!phoneRegex.international.test(cleanPhone)) {
      throw new Error('Número internacional inválido. Formato: +[código do país] [número]');
    }
  }

  // Formata o número para armazenamento
  return `+${cleanPhone}`;
};

// Função auxiliar para formatar o telefone para exibição
export const formatPhoneForDisplay = (phone) => {
  if (!phone) return '';
  
  // Remove o + e espaços
  const cleanPhone = phone.replace(/[\s+]/g, '');
  
  // Se for número brasileiro
  if (cleanPhone.startsWith('55')) {
    const ddd = cleanPhone.slice(2, 4);
    const number = cleanPhone.slice(4);
    
    // Se tiver 9 dígitos (celular)
    if (number.length === 9) {
      return `+55 (${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
    }
    // Se tiver 8 dígitos (fixo)
    return `+55 (${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`;
  }
  
  // Para números internacionais, apenas adiciona o +
  return `+${cleanPhone}`;
}; 