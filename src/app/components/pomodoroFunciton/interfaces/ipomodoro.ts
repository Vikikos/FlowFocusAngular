export interface IPomodoro {
  id: number;
  predetermined: string;
  work_duration: number;
  break_duration: number;
  total_sessions: number;
  created_at: string;
  updated_at: string;
  user_id: number;
}
