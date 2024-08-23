import { computed, ref } from 'vue';

export enum LoginState {
   LoginDefault,
   LoginMobile,
   LoginQrcode,
   LoginRegister,
   LoginForgetpw
}
const currentState = ref<LoginState>(LoginState.LoginDefault);
export function useLogin() {
   const getCurrentState = computed(() => currentState.value);
   function setCurrentState(state: LoginState) {
      currentState.value = state;
   }
   return { getCurrentState, setCurrentState };
}
