export interface FormValues {
  email: string;
  password: string;
}

export interface ILoginResult {
  user_creation_epoch: number;
  user_email: string;
  user_id: number;
  user_is_active: number;
  user_is_new: number;
  user_last_active_epoch: number;
  user_profile_image: string;
  user_token: string;
  user_username: string;
}

export interface IInput {
  type: string;
  register: any;
  name: string;
  placeholder: string;
  error: boolean;
  pattern?: RegExp;
}

export interface ITodo {
  content: string;
  id: string;
  editable: boolean;
}

export type IFieldValue = {
  todo: string;
};

export interface IUserInfo {
  name: string;
  email: string;
  imgUrl: string;
}
