
export interface ChildInfo {
  nom: string;
  prenom: string;
}

export interface ParentInfo {
  email: string;
  telephone: string;
}

export interface ChildSpecifications {
  classe: string;
  serie: string;
}

export interface CompleteFormData {
  childInfo?: ChildInfo;
  parentInfo?: ParentInfo;
  childSpecs?: ChildSpecifications;
}