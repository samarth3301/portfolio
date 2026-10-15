export type Tag = string;

export type Service = {
  title: string;
  body: string;
  tags: Tag[];
};

export type Project = {
  name: string;
  /** GitHub repo name; live metadata is merged in from the API. */
  repo: string | null;
  blurb: string;
  tags: Tag[];
  highlight?: boolean;
  more?: { label: string; href: string };
};

/** A project after GitHub metadata has been merged in. */
export type ResolvedProject = Project & {
  url: string | null;
  stars: number;
  homepage: string | null;
};

export type Role = {
  title: string;
  period: string;
  duration: string;
  type?: string;
  location: string | null;
  blurb: string;
  tags: Tag[];
};

export type Employer = {
  org: string;
  url: string | null;
  period: string;
  roles: Role[];
};

export type StackItem = { name: string; icon: string };
export type StackGroup = { group: string; items: StackItem[] };

export type SocialLink = { label: string; href: string; icon: string };

export type Icon = {
  svg: string | null;
  /** Only set for logos that need a different drawing on light backgrounds. */
  svgLight: string | null;
};

/** A stack item or social link with its resolved icon. */
export type WithIcon<T> = T & Icon;

export type Day = { date: string; level: number; count: number };

export type Contributions = { days: Day[]; total: number };
