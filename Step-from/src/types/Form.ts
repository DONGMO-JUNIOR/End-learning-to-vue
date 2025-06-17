
export interface ChildInfo {
  nom: string;
  prenom: string;
}

export interface ParentInfo {
  nom: string
  email: string;
  telephone: string;
  password: string;
  
}

export interface ChildSpecifications {
  classe: string;
  serie: string;
}

export interface CompleteFormData {
  childInfo: ChildInfo;
  parentInfo: ParentInfo;
  childSpecs: ChildSpecifications;
}

// Interface pour les utilisateurs enregistrés
export interface RegisteredUser {
  nom: string;
  email: string;
  password: string;
  telephone: string;
  enfant: {
    nom: string;
    prenom: string;
  };
  specifications: {
    classe: string;
    serie: string;
  };
  dateInscription: string;
  id: number;
}

// Interface pour les données de session utilisateur
export interface UserSession {
  nom: string;
  email: string;
  telephone: string;
  enfant: {
    nom: string;
    prenom: string;
  };
  specifications: {
    classe: string;
    serie: string;
  };
  isLoggedIn: boolean;
}