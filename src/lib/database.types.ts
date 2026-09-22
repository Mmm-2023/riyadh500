export type Database = {
  public: {
    Tables: {
      sectors: {
        Row: {
          id: string
          slug: string
          name: string
          sort_order: number
          cap: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          sort_order?: number
          cap?: number
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          sort_order?: number
          cap?: number
          created_at?: string
        }
        Relationships: []
      }
      leaders: {
        Row: {
          id: string
          sector_id: string
          name: string
          headline_role: string | null
          company: string | null
          photo_url: string | null
          credentials: string | null
          background: string | null
          track_record: string | null
          linkedin_url: string | null
          bio: string | null
          published: boolean
          vote_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sector_id: string
          name: string
          headline_role?: string | null
          company?: string | null
          photo_url?: string | null
          credentials?: string | null
          background?: string | null
          track_record?: string | null
          linkedin_url?: string | null
          bio?: string | null
          published?: boolean
          vote_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sector_id?: string
          name?: string
          headline_role?: string | null
          company?: string | null
          photo_url?: string | null
          credentials?: string | null
          background?: string | null
          track_record?: string | null
          linkedin_url?: string | null
          bio?: string | null
          published?: boolean
          vote_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'leaders_sector_id_fkey'
            columns: ['sector_id']
            isOneToOne: false
            referencedRelation: 'sectors'
            referencedColumns: ['id']
          },
        ]
      }
      votes: {
        Row: {
          id: string
          leader_id: string
          voter_fingerprint: string
          created_at: string
        }
        Insert: {
          id?: string
          leader_id: string
          voter_fingerprint: string
          created_at?: string
        }
        Update: {
          id?: string
          leader_id?: string
          voter_fingerprint?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'votes_leader_id_fkey'
            columns: ['leader_id']
            isOneToOne: false
            referencedRelation: 'leaders'
            referencedColumns: ['id']
          },
        ]
      }
      claim_requests: {
        Row: {
          id: string
          leader_id: string
          claimant_email: string
          claimant_name: string | null
          evidence_url: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          leader_id: string
          claimant_email: string
          claimant_name?: string | null
          evidence_url?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          leader_id?: string
          claimant_email?: string
          claimant_name?: string | null
          evidence_url?: string | null
          status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'claim_requests_leader_id_fkey'
            columns: ['leader_id']
            isOneToOne: false
            referencedRelation: 'leaders'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
