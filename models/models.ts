export type UserType = {
  password: string;
  email: string;
  id: number;
};

export type UpdateUserType = {
  oldPassword: string;
  newPassword: string;
  email: string;
};

export type DeleteUserType = {
  password: string;
  email: string;
};

export type createUserVars = {
  createUserId: number;
  password: string;
  email: string;
};

export type updateUserVars = {
  oldPassword: string;
  newPassword: string;
  email: string;
};

export type deleteUserVars = {
  password: string;
  email: string;
};

export type ProjectType = {
  id: number;
  name: string;
  user_id: number;
  challenges?: ChallengeType[];
};

export type isProject = {
  isProject: ProjectType;
};

export type getProjectById = {
  getProjectById: ProjectType;
};

export type getProjectByIdVars = {
  projectId: number;
};

export type isProjectVars = {
  userId: number;
};

export type createProjectVars = {
  createProjectId: number;
  name: string;
  userId: number;
};

export type ProjectNameExample = {
  examples: string[];
};

export type ChallengeType = {
  id: number | string;
  name: string;
  is_selected?: boolean | null;
  project_id?: number | null;
  index?: number | null;
  challenge_type?: string | null;
  ideas?: IdeaType[];
  opportunity_questions?: OQType | null;
  __typename?: "Challenge" | null;
};

export type ChallengeInputType = {
  id: number | string;
  name: string;
  is_selected?: boolean | null;
  project_id?: number | null;
  index?: number | null;
  challenge_type?: string | null;
}

export type createChallenge = {
  createChallenge: ChallengeType;
};

export type createChallengeVars = {
  challengeId: number;
  name: string;
  projectId: number;
  challengeType: string;
};

export type getChallengesByProject = {
  getChallengesByProject: [ChallengeType];
};

export type updateChallenges ={
  updateChallenges: [ChallengeType]
}

export type updateChallengesVars = {
  challenges: [ChallengeInputType]
}
export type getChallengesByProjectVars = {
  projectId: number;
};

export type deleteChallengeById = {
  deleteChallenge: ChallengeType;
};

export type deleteChallengeVars = {
  challengeId: number;
};

export type OQType = {
  challenge_id: number;
  id: number | string;
  name: string;
  __typename:"OQ"
}

export type createOQ ={
  createOQ: OQType
}

export type createOQVars= {
  challengeId: number;
  createOqId: number | string;
  name: string;
}

export type getOQ= {
  getOQ: OQType;
}

export type getOQVars= {
  challengeId: number;
}

export type IdeaType = {};


export type Error = {
  title: string;
  message: string;
};

export type Props = {
  onClick: () => void;
  href: string;
};

export type RefType = HTMLAnchorElement;

export type HelpText = {
  title: string;
  text: string;
};

export type IdeasExample = {
  sampleProjectName: string;
  type: string;
  examples: string[];
};
