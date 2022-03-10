/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../graphql/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ChallengeInputType: { // input type
    challenge_type?: string | null; // String
    id?: number | null; // Int
    index?: number | null; // Int
    is_selected?: boolean | null; // Boolean
    name?: string | null; // String
    project_id?: number | null; // Int
  }
  IdeaInputType: { // input type
    challenge_id?: number | null; // Int
    effort?: boolean | null; // Boolean
    id?: number | null; // Int
    impact?: boolean | null; // Boolean
    index?: number | null; // Int
    is_selected?: boolean | null; // Boolean
    name?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
}

export interface NexusGenObjects {
  Action: { // root type
    due_date?: NexusGenScalars['Date'] | null; // Date
    id?: number | null; // Int
    idea_id?: number | null; // Int
    succes_criteria?: string | null; // String
    user_id?: number | null; // Int
    what?: string | null; // String
  }
  Challenge: { // root type
    challenge_type?: string | null; // String
    id?: number | null; // Int
    index?: number | null; // Int
    is_selected?: boolean | null; // Boolean
    name?: string | null; // String
    project_id?: number | null; // Int
  }
  Idea: { // root type
    challenge_id?: number | null; // Int
    effort?: boolean | null; // Boolean
    id?: number | null; // Int
    impact?: boolean | null; // Boolean
    index?: number | null; // Int
    is_selected?: boolean | null; // Boolean
    name?: string | null; // String
  }
  Mutation: {};
  OQ: { // root type
    challenge_id?: number | null; // Int
    id?: number | null; // Int
    name?: string | null; // String
  }
  Project: { // root type
    id?: number | null; // Int
    name?: string | null; // String
    user_id?: number | null; // Int
  }
  Query: {};
  User: { // root type
    email?: string | null; // String
    id?: number | null; // Int
    password?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Action: { // field return type
    due_date: NexusGenScalars['Date'] | null; // Date
    id: number | null; // Int
    idea_id: number | null; // Int
    succes_criteria: string | null; // String
    user_id: number | null; // Int
    what: string | null; // String
  }
  Challenge: { // field return type
    challenge_type: string | null; // String
    id: number | null; // Int
    ideas: Array<NexusGenRootTypes['Idea'] | null> | null; // [Idea]
    index: number | null; // Int
    is_selected: boolean | null; // Boolean
    name: string | null; // String
    opportunity_question: NexusGenRootTypes['OQ'] | null; // OQ
    project_id: number | null; // Int
  }
  Idea: { // field return type
    action: NexusGenRootTypes['Action'] | null; // Action
    challenge_id: number | null; // Int
    effort: boolean | null; // Boolean
    id: number | null; // Int
    impact: boolean | null; // Boolean
    index: number | null; // Int
    is_selected: boolean | null; // Boolean
    name: string | null; // String
  }
  Mutation: { // field return type
    createAction: NexusGenRootTypes['Action']; // Action!
    createChallenge: NexusGenRootTypes['Challenge']; // Challenge!
    createIdea: NexusGenRootTypes['Idea']; // Idea!
    createOQ: NexusGenRootTypes['OQ']; // OQ!
    createProject: NexusGenRootTypes['Project']; // Project!
    createUser: NexusGenRootTypes['User']; // User!
    deleteAction: NexusGenRootTypes['Action']; // Action!
    deleteChallenge: NexusGenRootTypes['Challenge']; // Challenge!
    deleteIdea: NexusGenRootTypes['Idea']; // Idea!
    deleteOQ: NexusGenRootTypes['OQ']; // OQ!
    deleteProject: NexusGenRootTypes['Project']; // Project!
    deleteUser: NexusGenRootTypes['User']; // User!
    updateAction: NexusGenRootTypes['Action']; // Action!
    updateChallenges: Array<NexusGenRootTypes['Challenge'] | null>; // [Challenge]!
    updateIdea: NexusGenRootTypes['Idea']; // Idea!
    updateIdeas: Array<NexusGenRootTypes['Idea'] | null>; // [Idea]!
    updateOQ: NexusGenRootTypes['OQ']; // OQ!
    updateUser: NexusGenRootTypes['User']; // User!
  }
  OQ: { // field return type
    challenge_id: number | null; // Int
    id: number | null; // Int
    name: string | null; // String
  }
  Project: { // field return type
    challenges: Array<NexusGenRootTypes['Challenge'] | null> | null; // [Challenge]
    id: number | null; // Int
    name: string | null; // String
    user_id: number | null; // Int
  }
  Query: { // field return type
    action: Array<NexusGenRootTypes['Action'] | null>; // [Action]!
    challenges: Array<NexusGenRootTypes['Challenge'] | null>; // [Challenge]!
    getActionByIdeaId: NexusGenRootTypes['Action'] | null; // Action
    getActionsByUserId: Array<NexusGenRootTypes['Action'] | null>; // [Action]!
    getChallengesByProject: Array<NexusGenRootTypes['Challenge'] | null>; // [Challenge]!
    getIdeasByChallenge: Array<NexusGenRootTypes['Idea'] | null>; // [Idea]!
    getOQ: NexusGenRootTypes['OQ'] | null; // OQ
    getProjectById: NexusGenRootTypes['Project'] | null; // Project
    getProjectByUserId: Array<NexusGenRootTypes['Project'] | null> | null; // [Project]
    ideas: Array<NexusGenRootTypes['Idea'] | null>; // [Idea]!
    projects: Array<NexusGenRootTypes['Project'] | null>; // [Project]!
    users: Array<NexusGenRootTypes['User'] | null>; // [User]!
  }
  User: { // field return type
    email: string | null; // String
    id: number | null; // Int
    password: string | null; // String
    projects: Array<NexusGenRootTypes['Project'] | null> | null; // [Project]
  }
}

export interface NexusGenFieldTypeNames {
  Action: { // field return type name
    due_date: 'Date'
    id: 'Int'
    idea_id: 'Int'
    succes_criteria: 'String'
    user_id: 'Int'
    what: 'String'
  }
  Challenge: { // field return type name
    challenge_type: 'String'
    id: 'Int'
    ideas: 'Idea'
    index: 'Int'
    is_selected: 'Boolean'
    name: 'String'
    opportunity_question: 'OQ'
    project_id: 'Int'
  }
  Idea: { // field return type name
    action: 'Action'
    challenge_id: 'Int'
    effort: 'Boolean'
    id: 'Int'
    impact: 'Boolean'
    index: 'Int'
    is_selected: 'Boolean'
    name: 'String'
  }
  Mutation: { // field return type name
    createAction: 'Action'
    createChallenge: 'Challenge'
    createIdea: 'Idea'
    createOQ: 'OQ'
    createProject: 'Project'
    createUser: 'User'
    deleteAction: 'Action'
    deleteChallenge: 'Challenge'
    deleteIdea: 'Idea'
    deleteOQ: 'OQ'
    deleteProject: 'Project'
    deleteUser: 'User'
    updateAction: 'Action'
    updateChallenges: 'Challenge'
    updateIdea: 'Idea'
    updateIdeas: 'Idea'
    updateOQ: 'OQ'
    updateUser: 'User'
  }
  OQ: { // field return type name
    challenge_id: 'Int'
    id: 'Int'
    name: 'String'
  }
  Project: { // field return type name
    challenges: 'Challenge'
    id: 'Int'
    name: 'String'
    user_id: 'Int'
  }
  Query: { // field return type name
    action: 'Action'
    challenges: 'Challenge'
    getActionByIdeaId: 'Action'
    getActionsByUserId: 'Action'
    getChallengesByProject: 'Challenge'
    getIdeasByChallenge: 'Idea'
    getOQ: 'OQ'
    getProjectById: 'Project'
    getProjectByUserId: 'Project'
    ideas: 'Idea'
    projects: 'Project'
    users: 'User'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    password: 'String'
    projects: 'Project'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createAction: { // args
      due_date: string; // String!
      id: number; // Int!
      idea_id: number; // Int!
      succes_criteria: string; // String!
      user_id: number; // Int!
      what: string; // String!
    }
    createChallenge: { // args
      challenge_type: string; // String!
      id: number; // Int!
      name: string; // String!
      project_id: number; // Int!
    }
    createIdea: { // args
      challenge_id: number; // Int!
      id: number; // Int!
      name: string; // String!
    }
    createOQ: { // args
      challenge_id: number; // Int!
      id: number; // Int!
      name: string; // String!
    }
    createProject: { // args
      id: number; // Int!
      name: string; // String!
      user_id: number; // Int!
    }
    createUser: { // args
      email: string; // String!
      id: number; // Int!
      password: string; // String!
    }
    deleteAction: { // args
      id: number; // Int!
    }
    deleteChallenge: { // args
      id: number; // Int!
    }
    deleteIdea: { // args
      id: number; // Int!
    }
    deleteOQ: { // args
      id: number; // Int!
    }
    deleteProject: { // args
      project_id: number; // Int!
    }
    deleteUser: { // args
      email: string; // String!
      password: string; // String!
    }
    updateAction: { // args
      due_date: string; // String!
      id: number; // Int!
      succes_criteria: string; // String!
      what: string; // String!
    }
    updateChallenges: { // args
      challenges?: NexusGenInputs['ChallengeInputType'][] | null; // [ChallengeInputType!]
    }
    updateIdea: { // args
      effort?: boolean | null; // Boolean
      id: number; // Int!
      impact?: boolean | null; // Boolean
      index?: number | null; // Int
      is_selected?: boolean | null; // Boolean
      name: string; // String!
    }
    updateIdeas: { // args
      ideas?: NexusGenInputs['IdeaInputType'][] | null; // [IdeaInputType!]
    }
    updateOQ: { // args
      id: number; // Int!
      name: string; // String!
    }
    updateUser: { // args
      email: string; // String!
      newPassword: string; // String!
      oldPassword: string; // String!
    }
  }
  Query: {
    getActionByIdeaId: { // args
      idea_id: number; // Int!
    }
    getActionsByUserId: { // args
      user_id: number; // Int!
    }
    getChallengesByProject: { // args
      project_id: number; // Int!
    }
    getIdeasByChallenge: { // args
      challenge_id: number; // Int!
    }
    getOQ: { // args
      challenge_id: number; // Int!
    }
    getProjectById: { // args
      id: number; // Int!
    }
    getProjectByUserId: { // args
      userId: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}