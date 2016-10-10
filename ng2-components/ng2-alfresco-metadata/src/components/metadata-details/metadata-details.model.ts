class User {
  private displayName: string;
  private id: string;

  constructor(obj: any) {
    this.id = obj.id;
    this.displayName = obj.displayName;
  }
}

export class Details {
  private name: string;
  private id: string;
  private mimeTypeName: string;
  private sizeInBytes: number;
  private createdByUser: User;
  private createdAt: Date;
  private modifiedAt: Date;
  private modifiedByUser: User;
  private author: string;
  private description: string;
  private title: string;
  private nodeType: string;
  private isFolder: boolean;

  constructor(obj: any) {
    this.id = obj.id;
    this.isFolder = obj.isFolder;
    this.nodeType = obj.nodeType;
    this.name = obj.name;
    this.createdAt = obj.createdAt;
    this.modifiedAt = obj.modifiedAt;
    this.createdByUser = new User(obj.createdByUser);
    this.modifiedByUser = new User(obj.modifiedByUser);
    this.sizeInBytes = (obj.content || {} ).sizeInBytes;
    this.mimeTypeName = (obj.content || {} ).mimeTypeName;
    this.author = obj.properties['cm:author'];
    this.title = obj.properties['cm:title'];
    this.description = obj.properties['cm:description'];
  }

  public properties(obj) {
    return {
        'cm:author': obj.author,
        'cm:title': obj.title,
        'cm:description': obj.description
    }
  }
}
