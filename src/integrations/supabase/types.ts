export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      leads: {
        Row: {
          budget: string | null
          business_type: string | null
          created_at: string
          id: string
          line_id: string | null
          message: string | null
          name: string
          notes: string | null
          phone: string
          preferred_time: string | null
          source: string | null
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
        }
        Insert: {
          budget?: string | null
          business_type?: string | null
          created_at?: string
          id?: string
          line_id?: string | null
          message?: string | null
          name: string
          notes?: string | null
          phone: string
          preferred_time?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Update: {
          budget?: string | null
          business_type?: string | null
          created_at?: string
          id?: string
          line_id?: string | null
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string
          preferred_time?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          addons: Json
          business_type: string | null
          created_at: string
          customer_email: string | null
          customer_line: string | null
          customer_name: string
          customer_phone: string
          id: string
          notes: string | null
          order_code: string
          package_name: string
          package_price: number
          payment_method: string | null
          slip_url: string | null
          status: Database["public"]["Enums"]["order_status"]
          total: number
          updated_at: string
        }
        Insert: {
          addons?: Json
          business_type?: string | null
          created_at?: string
          customer_email?: string | null
          customer_line?: string | null
          customer_name: string
          customer_phone: string
          id?: string
          notes?: string | null
          order_code?: string
          package_name: string
          package_price?: number
          payment_method?: string | null
          slip_url?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total?: number
          updated_at?: string
        }
        Update: {
          addons?: Json
          business_type?: string | null
          created_at?: string
          customer_email?: string | null
          customer_line?: string | null
          customer_name?: string
          customer_phone?: string
          id?: string
          notes?: string | null
          order_code?: string
          package_name?: string
          package_price?: number
          payment_method?: string | null
          slip_url?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total?: number
          updated_at?: string
        }
        Relationships: []
      }
      project_updates: {
        Row: {
          created_at: string
          id: string
          is_complete: boolean
          message: string | null
          order_id: string
          step: number
          step_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_complete?: boolean
          message?: string | null
          order_id: string
          step?: number
          step_name: string
        }
        Update: {
          created_at?: string
          id?: string
          is_complete?: boolean
          message?: string | null
          order_id?: string
          step?: number
          step_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_updates_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      promotions: {
        Row: {
          button_url: string | null
          created_at: string
          enabled: boolean
          end_at: string | null
          id: string
          text: string
          updated_at: string
        }
        Insert: {
          button_url?: string | null
          created_at?: string
          enabled?: boolean
          end_at?: string | null
          id?: string
          text: string
          updated_at?: string
        }
        Update: {
          button_url?: string | null
          created_at?: string
          enabled?: boolean
          end_at?: string | null
          id?: string
          text?: string
          updated_at?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          addons: Json | null
          budget: string | null
          business_type: string | null
          created_at: string
          details: string | null
          email: string | null
          id: string
          line_id: string | null
          name: string
          package_name: string | null
          phone: string
          status: Database["public"]["Enums"]["quote_status"]
          updated_at: string
        }
        Insert: {
          addons?: Json | null
          budget?: string | null
          business_type?: string | null
          created_at?: string
          details?: string | null
          email?: string | null
          id?: string
          line_id?: string | null
          name: string
          package_name?: string | null
          phone: string
          status?: Database["public"]["Enums"]["quote_status"]
          updated_at?: string
        }
        Update: {
          addons?: Json | null
          budget?: string | null
          business_type?: string | null
          created_at?: string
          details?: string | null
          email?: string | null
          id?: string
          line_id?: string | null
          name?: string
          package_name?: string | null
          phone?: string
          status?: Database["public"]["Enums"]["quote_status"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      lead_status:
        | "new"
        | "pending_call"
        | "contacted"
        | "negotiating"
        | "closed"
        | "not_interested"
      order_status:
        | "pending_slip"
        | "confirmed"
        | "in_progress"
        | "delivered"
        | "completed"
        | "cancelled"
      quote_status: "new" | "sent" | "accepted" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      lead_status: [
        "new",
        "pending_call",
        "contacted",
        "negotiating",
        "closed",
        "not_interested",
      ],
      order_status: [
        "pending_slip",
        "confirmed",
        "in_progress",
        "delivered",
        "completed",
        "cancelled",
      ],
      quote_status: ["new", "sent", "accepted", "rejected"],
    },
  },
} as const
