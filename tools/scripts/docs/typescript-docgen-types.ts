import * as ts from 'typescript';

/**
 * THX TO @michaelbromley
 * copied from here: https://github.com/vendure-ecommerce/vendure/blob/8592e9d80427f08ff7454cd9106c07f15aa765d0/scripts/docs/typescript-docgen-types.ts#L1
 */

export interface MethodParameterInfo {
  name: string;
  type: string;
  optional: boolean;
  initializer?: string;
}

export interface MemberInfo {
  name: string;
  description: string;
  type: string;
  fullText: string;
  modifiers: string[];
}

export interface PropertyInfo extends MemberInfo {
    kind: 'property';
    defaultValue: string;
}

export interface MethodInfo extends MemberInfo {
    kind: 'method';
    parameters: MethodParameterInfo[];
}

export interface DocsPage {
    title: string;
    category: string;
    declarations: ParsedDeclaration[];
    fileName: string;
}

export interface DeclarationInfo {
    packageName: string;
    sourceFile: string;
    sourceLine: number;
    title: string;
    fullText: string;
    weight: number;
    category: string;
    description: string;
    page: string | undefined;
}

export interface InterfaceInfo extends DeclarationInfo {
    kind: 'interface';
    extends?: string;
    members: Array<PropertyInfo | MethodInfo>;
}

export interface ClassInfo extends DeclarationInfo {
    kind: 'class';
    implements?: string;
    extends?: string;
    members: Array<PropertyInfo | MethodInfo>;
}

export interface TypeAliasInfo extends DeclarationInfo {
    kind: 'typeAlias';
    members?: Array<PropertyInfo | MethodInfo>;
    type: ts.TypeNode;
}

export interface EnumInfo extends DeclarationInfo {
    kind: 'enum';
    members: PropertyInfo[];
}

export interface FunctionInfo extends DeclarationInfo {
    kind: 'function';
    parameters: MethodParameterInfo[];
    type?: ts.TypeNode;
}

export interface VariableInfo extends DeclarationInfo {
    kind: 'variable';
}

export type ParsedDeclaration =
  | TypeAliasInfo
  | ClassInfo
  | InterfaceInfo
  | EnumInfo
  | FunctionInfo
  | VariableInfo;
export type ValidDeclaration =
  | ts.InterfaceDeclaration
  | ts.TypeAliasDeclaration
  | ts.ClassDeclaration
  | ts.EnumDeclaration
  | ts.FunctionDeclaration
  | ts.VariableStatement;
export type TypeMap = Map<string, string>;
