import { gql} from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $createUserId: Int!
    $password: String!
    $email: String!
  ) {
    createUser(id: $createUserId, password: $password, email: $email) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $oldPassword: String!
    $newPassword: String!
    $email: String!
  ) {
    updateUser(
      oldPassword: $oldPassword
      newPassword: $newPassword
      email: $email
    ) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($password: String!, $email: String!) {
  deleteUser(password: $password, email: $email) {
    id
  }
}

`;

export const IS_PROJECT = gql`
query Query($userId: Int!) {
  isProject(userId: $userId) {
    id
  }
}
`;


export const CREATE_PROJECT = gql`
 mutation Mutation($createProjectId: Int!, $name: String!, $userId: Int!) {
  createProject(id: $createProjectId, name: $name, user_id: $userId) {
    id
    name
    user_id
  }
}
`;

export const GET_PROJECT_BY_ID = gql`
query GetProjectById($projectId: Int!) {
  getProjectById(id: $projectId) {
    id
    name
    user_id
    challenges {
      id
      name
      is_selected
      project_id
      challenge_type
    }
  }
}
`;

export const CREATE_CHALLENGE = gql`
mutation CreateChallenge($challengeId: Int!, $name: String!, $projectId: Int!, $challengeType: String!) {
  createChallenge(id: $challengeId, name: $name, project_id: $projectId, challenge_type: $challengeType) {
    id
    is_selected
    index
    name
    challenge_type
    project_id
  }
}
`;

export const GET_CHALLENGES_BY_PROJECT = gql`
query GetChallengesByProject($projectId: Int!) {
  getChallengesByProject(project_id: $projectId) {
    id
    name
    index
    is_selected
    challenge_type
    project_id
  }
}
`;

export const UPDATE_CHALLENGES_INDEXES = gql`
mutation Mutation($challenges: [ChallengeInputType!]) {
  updateChallenges(challenges: $challenges) {
    id
    name
    index
    is_selected
    challenge_type
    project_id
  }
}
`

export const DELETE_CHALLENGE_BY_ID = gql`
mutation DeleteChallenge($challengeId: Int!) {
  deleteChallenge(id: $challengeId) {
    id
    name
    is_selected
    index
    project_id
    challenge_type
  }
}
`

export const CREATE_OQ = gql`
mutation CreateOQ($createOqId: Int!, $name: String!, $challengeId: Int!) {
  createOQ(id: $createOqId, name: $name, challenge_id: $challengeId) {
    id
    name
    challenge_id
  }
}
`

export const GET_OQ_BY_CHALLENGE_ID = gql`
query Query($challengeId: Int!) {
  getOQ(challenge_id: $challengeId) {
    id
    name
    challenge_id
  }
}
`

