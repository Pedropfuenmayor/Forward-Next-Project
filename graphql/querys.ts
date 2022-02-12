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
query GetProjectById($getProjectByIdId: Int!) {
  getProjectById(id: $getProjectByIdId) {
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
mutation CreateChallenge($createChallengeId: Int!, $name: String!, $projectId: Int!, $challengeType: String!) {
  createChallenge(id: $createChallengeId, name: $name, project_id: $projectId, challenge_type: $challengeType) {
    name
    id
    project_id
    challenge_type
    is_selected
  }
}
`;


