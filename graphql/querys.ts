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
  getProjectByUserId(userId: $userId) {
    id
  }
}
`;

export const GET_PROJECT_BY_USER_ID = gql`
query Query($userId: Int!) {
  getProjectByUserId(userId: $userId) {
    name
    id
    user_id
    challenges {
      id
      project_id
      opportunity_question {
        name
      }
      ideas {
        id
        challenge_id
        name
      }
    }
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

export const DELETE_PROJECT = gql`
mutation DeleteProject($projectId: Int!) {
  deleteProject(project_id: $projectId) {
    id
    name
    user_id
  }
}
`


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

export const UPDATE_OQ_BY_ID = gql`
mutation UpdateOQ($updateOqId: Int!, $name: String!) {
  updateOQ(id: $updateOqId, name: $name) {
    id
    name
    challenge_id
  }
}
`

export const DELETE_OQ_BY_ID = gql`
mutation DeleteOQ($deleteOqId: Int!) {
  deleteOQ(id: $deleteOqId) {
    id
    name
    challenge_id
  }
}
`

export const GET_IDEAS_BY_CHALLENGE_ID = gql`
query GetIdeasByChallenge($challengeId: Int!) {
  getIdeasByChallenge(challenge_id: $challengeId) {
    id
    name
    index
    is_selected
    challenge_id
    effort
    impact
  }
}
`

export const CREATE_IDEA = gql`
mutation CreateIdea($createIdeaId: Int!, $name: String!, $challengeId: Int!) {
  createIdea(id: $createIdeaId, name: $name, challenge_id: $challengeId) {
    id
    name
    index
    is_selected
    challenge_id
    effort
    impact
  }
}
`

export const DELETE_IDEA = gql`
mutation DeleteIdea($deleteIdeaId: Int!) {
  deleteIdea(id: $deleteIdeaId) {
    id
    name
    index
    is_selected
    challenge_id
    effort
    impact
  }
}
`

export const UPDATE_IDEAS_INDEXES = gql`
mutation UpdateIdeas($ideas: [IdeaInputType!]) {
  updateIdeas(ideas: $ideas) {
    id
    challenge_id
    index
    name
    impact
    effort
    is_selected
  }
}
`

export const UPDATE_IDEA_BY_ID = gql`
mutation Mutation($updateIdeaId: Int!, $name: String!, $index: Int, $isSelected: Boolean, $effort: Boolean, $impact: Boolean) {
  updateIdea(id: $updateIdeaId, name: $name, index: $index, is_selected: $isSelected, effort: $effort, impact: $impact) {
    id
    name
    index
    is_selected
    challenge_id
    effort
    impact
  }
}
`

export const GET_ACTION_BY_IDEA_ID = gql`
query GetActionByIdeaId($ideaId: Int!) {
  getActionByIdeaId(idea_id: $ideaId) {
    id
    due_date
    what
    succes_criteria
    idea_id
  }
}
`

export const CREATE_ACTION = gql`
mutation CreateAction($createActionId: Int!, $what: String!, $dueDate: String!, $succesCriteria: String!, $ideaId: Int!, $userId: Int!) {
  createAction(id: $createActionId, what: $what, due_date: $dueDate, succes_criteria: $succesCriteria, idea_id: $ideaId, user_id: $userId) {
    id
    what
    due_date
    succes_criteria
    idea_id
    user_id
  }
}
`

export const UPDATE_ACTION =gql`
mutation Mutation($updateActionId: Int!, $what: String!, $dueDate: String!, $succesCriteria: String!) {
  updateAction(id: $updateActionId, what: $what, due_date: $dueDate, succes_criteria: $succesCriteria) {
    id
    what
    due_date
    succes_criteria
    idea_id
    user_id
  }
}
`

export const GET_ACTIONS_BY_USER_ID = gql`
query ActionsByUserId($userId: Int!) {
  getActionsByUserId(user_id: $userId) {
    id
    what
    due_date
    succes_criteria
    idea_id
    user_id
  }
}
`

export const DELETE_ACTION= gql `
mutation DeleteAction($deleteActionId: Int!) {
  deleteAction(id: $deleteActionId) {
    id
    what
    due_date
    succes_criteria
    idea_id
    user_id
  }
}
`