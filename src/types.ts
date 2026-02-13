export interface Post {
  id: string;
  title: string;
  slug: string;
  details: string;
  status: string;
  status_label: string;
  score: number;
  comment_count: number;
  board_id: string;
  category_id: string | null;
  member_id: number;
  board?: Board;
  category?: Category | null;
  member?: Member;
  votes?: Vote[];
  comments?: Comment[];
  eta: string | null;
  show_on_roadmap: boolean;
  is_merged: boolean;
  merged_into_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Board {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_private: boolean;
  categories?: Category[];
  post_count?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  board_id: string;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  member_id: number;
  body: string;
  is_internal: boolean;
  is_pinned: boolean;
  parent_id: string | null;
  member?: Member;
  replies?: Comment[];
  created_at: string;
  updated_at: string;
}

export interface Vote {
  id: string;
  post_id: string;
  member_id: number;
  member?: Member;
  created_at: string;
}

export interface ChangelogEntry {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: string;
  is_public: boolean;
  published_at: string | null;
  scheduled_at: string | null;
  member?: Member;
  created_at: string;
  updated_at: string;
}
