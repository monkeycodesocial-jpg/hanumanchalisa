export interface UploadRow {
  id: string;
  file_url: string;
  file_type: string;
  file_name: string;
  uploaded_by: string;
  city: string;
  caption: string;
  created_at: string;
  approved: boolean;
  compressed: boolean;
}

export interface Database {
  public: {
    Tables: {
      uploads: {
        Row: UploadRow;
        Insert: {
          id?: string;
          file_url: string;
          file_type: string;
          file_name: string;
          uploaded_by?: string;
          city?: string;
          caption?: string;
          created_at?: string;
          approved?: boolean;
          compressed?: boolean;
        };
        Update: {
          id?: string;
          file_url?: string;
          file_type?: string;
          file_name?: string;
          uploaded_by?: string;
          city?: string;
          caption?: string;
          created_at?: string;
          approved?: boolean;
          compressed?: boolean;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
