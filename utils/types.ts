export interface Challenges {
  name: string;
  type: string;
  level: string;
  difficulty: string;
  status: string;
  tasks: string;
  skills: string;
  displayImage: string;
  designImage: string;
  created_at: Date;
  id: string;
  colors?: string;
  description: string;
  challenge_pages?: [];
}

export interface PageProps {
  id: string;
  created_at: Date;
  name: string;
  mobile_path: string;
  design_path: string;
  challenge_id: string;
}

export interface UserProp {
  id: string;
  created_at: Date;
  username: string;
  profile_url: string;
  email: string;
  role: string;
}
