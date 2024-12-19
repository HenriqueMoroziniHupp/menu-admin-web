export default {
    LOGIN: {
        TITLE: 'Seja bem-vindo',
        DESCRIPTION: 'Login',
        EMAIL: 'E-mail',
        EMAIL_PLACEHOLDER: 'Digite seu e-mail',
        PASSWORD: 'Senha',
        PASSWORD_PLACEHOLDER: 'Digite sua senha',
        RECOVERY: 'Esqueceu sua senha?',
        BUTTON: 'Entrar',
        LOGOUT: 'Sair',
        ERROR: {
            INVALID: 'Email ou senha invalidos',
        }
    },
    TOP_BAR : {
        PROFILE: 'Perfil'
    },
    FOOTER: 'Desenvolvido por',
    DASHBOARD: {
        MODULE: 'Dashboard',
        PRODUCTS: 'Produtos',
        CATEGORIES: 'Categorias',
        CLIENTS: 'Clientes',
        ACCESS: 'Acessos',
        CHART: {
            TITLE: 'Acessos mensais'
        },
    },
    SETTINGS: {
        MODULE: 'Configurações',
        BANNER: {
            TITLE: 'Banner do Cardápio',
        },
        NAME: {
            TITLE: 'Nome',
            REQUIRED: 'Nome é obrigatório',
        },
        DESCRIPTION: 'Descrição (Opcional)',
        TOAST: {
            SUBMIT: {
                SUCCESS: 'Configurações salva com sucesso',
                ERROR: 'Ocorreu algum erro ao salvar suas configurações',
            },
        },
    },
    CATEGORIES: {
        MODULE: 'Categorias',
        DESCRIPTION: 'Gerenciar Categorias',
        SEARCH: 'Procurar ...',
        MODAL_TITLE: 'Detalhes da Categoria',
        INPUT: {
            NAME: {
                TITLE: 'Nome',
                REQUIRED: 'Nome é obrigatório',
            },
            STATUS: 'Status',
        },
        BUTTONS: {
            NEW: 'Nova Categoria',
        },
        TABLE: {
            CURRENT_PAGE: 'Exibindo {first} a {last} de {totalRecords} categories',
            NAME: 'Nome',
            STATUS: 'Status',
        },
        STATUS: {
            ACTIVE: 'Ativo',
            INACTIVE: 'Inativo',
        },
        DELETE_MODAL: {
            TITLE: 'Confirmar',
            DESCRIPTION: 'Tem certeza de que deseja excluir {0} e {1} seus items?',
            1: 'todos',
        },
        TOAST: {
            SUBMIT: {
                SUCCESS: 'Categoria salva com sucesso',
                ERROR: 'Ocorreu algum erro ao salvar a categoria',
            },
            FETCH_ERROR: 'Ocorreu algum erro ao carregar a lista de categorias, tente novamente',
        },
    },
    PRODUCTS: {
        MODULE: 'Produtos',
        DESCRIPTION: 'Gerenciar Produtos',
        SEARCH: 'Procurar ...',
        MODAL_TITLE: 'Detalhes do Produto',
        INPUT: {
            NAME: {
                TITLE: 'Nome',
                REQUIRED: 'Nome é obrigatório',
            },
            DESCRIPTION: 'Description (Optional)',
            CATEGORY: {
                TITLE: 'Name',
                PLACEHOLDER: 'Selecione uma categoria',
                REQUIRED: 'Categoria é obrigatória.',
            },
            STATUS: 'Status',
            PRICE: 'Preço',
        },
        BUTTONS: {
            NEW: 'Novo Produto',
            NEW_PRICE: 'Novo Preço'
        },
        TABLE: {
            CURRENT_PAGE: 'Exibindo {first} a {last} de {totalRecords} produtos',
            IMAGE: 'Imagem',
            NAME: 'Nome',
            CATEGORY: 'Categoria',
            STATUS: 'Status',
        },
        STATUS: {
            ACTIVE: 'Ativo',
            INACTIVE: 'Inativo',
            OUTOFSTOCK: 'Sem Estoque'
        },
        PRICES: {
            SMALL: 'Pequeno',
            MEDIUM: 'Médio',
            LARGE: 'Grande',
        },
        DELETE_MODAL: {
            TITLE: 'Confirmar',
            DESCRIPTION: 'Tem certeza de que deseja excluir',
        },
        TOAST: {
            SUBMIT: {
                SUCCESS: 'Produto salvo com sucesso',
                ERROR: 'Ocorreu algum erro ao salvar seu produto',
            },
            FETCH_ERROR: 'Ocorreu algum erro ao carregar a lista de produtos, tente novamente',

        }
    },
    QR_CODE: {
        MODULE: 'QR Code',
        CARD: {
            MENU: 'CARDÁPIO',
            INFO: 'Escaneie ou acesse o link abaixo',
        },
        DOWNLOAD: {
            SIMPLE: 'Baixar QRCode simples',
            STYLED: 'Baixar QRCode estilizado'
        }
    },
    TOAST: {
        SUMMARY: {
            SUCCESS: 'Sucesso',
            ERROR: 'Erro',
        },
        ERROR: {
            IMAGE: 'Ocorreu algum erro ao salvar a imagem',
            DELETE: 'Ocorreu algum erro ao deletar',
            FETCH: 'Ocorreu algum erro ao carregar os dados, tente novamente',
        },
        SUCCESS: {
            DELETE: 'Deletado com sucesso',
        }
    },
    COMMON: {
        BUTTONS: {
            SAVE: 'Salvar',
            CANCEL: 'Cancelar',
            IMAGE: 'Trocar Imagem',
            ADJUST: 'Ajustar',
            YES: 'Sim',
            NO: 'Não',
        },
        UPLOADER: {
            DESCRIPTION: 'Selecione ou arraste e solte a imagem aqui',
            REQUIRED: 'Imagem é obrigatória',
        },
    },
    MENU_APP: 'Abrir Cardápio'
}
