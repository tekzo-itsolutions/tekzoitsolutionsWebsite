import { supabase } from '../utils/supabase';

export const authService = {
  async login(email, password) {
    try {
      const { data, error } = await supabase.rpc('login_admin', {
        p_email: email,
        p_password: password
      });
      
      if (error) {
        return { success: false, message: error.message };
      }
      
      return data;
    } catch (err) {
      console.error('Login service exception:', err);
      return { success: false, message: 'An unexpected connection error occurred.' };
    }
  },

  async verifySession(token) {
    try {
      const { data, error } = await supabase.rpc('verify_admin_session', {
        p_token: token
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return data;
    } catch (err) {
      console.error('Verify session service exception:', err);
      return { success: false, message: 'An unexpected connection error occurred.' };
    }
  },

  async logout(token) {
    try {
      const { data, error } = await supabase.rpc('logout_admin', {
        p_token: token
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return data;
    } catch (err) {
      console.error('Logout service exception:', err);
      return { success: false, message: 'An unexpected connection error occurred.' };
    }
  },

  async changePassword(token, oldPassword, newPassword) {
    try {
      const { data, error } = await supabase.rpc('change_admin_password', {
        p_token: token,
        p_old_password: oldPassword,
        p_new_password: newPassword
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return data;
    } catch (err) {
      console.error('Change password service exception:', err);
      return { success: false, message: 'An unexpected connection error occurred.' };
    }
  }
};
