export type WorkspaceType = "personal" | "cards" | "business";

export type WorkspaceStatus = "active" | "inactive";

export type Workspace = {
  id: string;
  type: WorkspaceType;
  name: string;
  status: WorkspaceStatus;
  ownerId: string;
  createdAt: string;
};
