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
      blog_posts: {
        Row: {
          category: string | null
          content: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      domains: {
        Row: {
          created_at: string
          customer_email: string | null
          customer_name: string
          customer_phone: string | null
          domain: string
          domain_expiry: string | null
          hosting_expiry: string | null
          hosting_provider: string | null
          id: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email?: string | null
          customer_name: string
          customer_phone?: string | null
          domain: string
          domain_expiry?: string | null
          hosting_expiry?: string | null
          hosting_provider?: string | null
          id?: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string | null
          domain?: string
          domain_expiry?: string | null
          hosting_expiry?: string | null
          hosting_provider?: string | null
          id?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      faq_items: {
        Row: {
          answer: string
          category: string
          created_at: string
          id: string
          question: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          answer: string
          category: string
          created_at?: string
          id?: string
          question: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string
          id?: string
          question?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
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
      packages: {
        Row: {
          badge: string | null
          created_at: string
          delivery_days: number | null
          features: Json
          id: string
          name: string
          price: number
          recommended: boolean
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          badge?: string | null
          created_at?: string
          delivery_days?: number | null
          features?: Json
          id?: string
          name: string
          price?: number
          recommended?: boolean
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          badge?: string | null
          created_at?: string
          delivery_days?: number | null
          features?: Json
          id?: string
          name?: string
          price?: number
          recommended?: boolean
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      page_seo: {
        Row: {
          created_at: string
          description: string | null
          enabled: boolean
          id: string
          og_image_url: string | null
          route: string
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: string
          og_image_url?: string | null
          route: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: string
          og_image_url?: string | null
          route?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          category: string
          created_at: string
          demo_url: string | null
          description: string | null
          id: string
          image_url: string | null
          is_real: boolean
          name: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          category: string
          created_at?: string
          demo_url?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_real?: boolean
          name: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          category?: string
          created_at?: string
          demo_url?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_real?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
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
      rate_limits: {
        Row: {
          created_at: string
          id: string
          key: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          business_type: string | null
          created_at: string
          customer_name: string
          id: string
          platform: string | null
          rating: number
          sort_order: number
          text: string
          updated_at: string
          verified: boolean
          visible: boolean
        }
        Insert: {
          business_type?: string | null
          created_at?: string
          customer_name: string
          id?: string
          platform?: string | null
          rating?: number
          sort_order?: number
          text: string
          updated_at?: string
          verified?: boolean
          visible?: boolean
        }
        Update: {
          business_type?: string | null
          created_at?: string
          customer_name?: string
          id?: string
          platform?: string | null
          rating?: number
          sort_order?: number
          text?: string
          updated_at?: string
          verified?: boolean
          visible?: boolean
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          about_text: string | null
          bank_account_info: string | null
          company_address: string | null
          company_email: string | null
          company_line_id: string | null
          company_name: string | null
          company_phone: string | null
          company_tagline: string | null
          ga4_id: string | null
          id: number
          line_webhook_url: string | null
          promo_countdown_end: string | null
          promo_text: string | null
          promptpay_id: string | null
          promptpay_qr_url: string | null
          province_coverage: Json | null
          smtp_from_email: string | null
          smtp_from_name: string | null
          smtp_host: string | null
          smtp_port: number | null
          smtp_user: string | null
          social_facebook: string | null
          social_instagram: string | null
          social_line_oa: string | null
          social_tiktok: string | null
          social_youtube: string | null
          stats_clients: number | null
          stats_projects: number | null
          stats_satisfaction: number | null
          stats_years: number | null
          updated_at: string
        }
        Insert: {
          about_text?: string | null
          bank_account_info?: string | null
          company_address?: string | null
          company_email?: string | null
          company_line_id?: string | null
          company_name?: string | null
          company_phone?: string | null
          company_tagline?: string | null
          ga4_id?: string | null
          id?: number
          line_webhook_url?: string | null
          promo_countdown_end?: string | null
          promo_text?: string | null
          promptpay_id?: string | null
          promptpay_qr_url?: string | null
          province_coverage?: Json | null
          smtp_from_email?: string | null
          smtp_from_name?: string | null
          smtp_host?: string | null
          smtp_port?: number | null
          smtp_user?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_line_oa?: string | null
          social_tiktok?: string | null
          social_youtube?: string | null
          stats_clients?: number | null
          stats_projects?: number | null
          stats_satisfaction?: number | null
          stats_years?: number | null
          updated_at?: string
        }
        Update: {
          about_text?: string | null
          bank_account_info?: string | null
          company_address?: string | null
          company_email?: string | null
          company_line_id?: string | null
          company_name?: string | null
          company_phone?: string | null
          company_tagline?: string | null
          ga4_id?: string | null
          id?: number
          line_webhook_url?: string | null
          promo_countdown_end?: string | null
          promo_text?: string | null
          promptpay_id?: string | null
          promptpay_qr_url?: string | null
          province_coverage?: Json | null
          smtp_from_email?: string | null
          smtp_from_name?: string | null
          smtp_host?: string | null
          smtp_port?: number | null
          smtp_user?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_line_oa?: string | null
          social_tiktok?: string | null
          social_youtube?: string | null
          stats_clients?: number | null
          stats_projects?: number | null
          stats_satisfaction?: number | null
          stats_years?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      topup_items: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          price: string
          sort_order: number
          unit: string | null
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          price: string
          sort_order?: number
          unit?: string | null
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          price?: string
          sort_order?: number
          unit?: string | null
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "staff"
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
      app_role: ["admin", "staff"],
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
