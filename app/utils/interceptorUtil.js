class InterceptorUtil {
  constructor() {
    this.interceptor = null;
  }

  setInterceptor(interceptor) {
    this.interceptor = interceptor;
  }

  getInterceptor() {
    return this.interceptor;
  }
}

export default new InterceptorUtil;
