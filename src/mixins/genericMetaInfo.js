export default {
  metaInfo() {
    if (this.isLoading) {
      return {};
    }

    return {
      title: `${this.$route.name} - MyTerm`
    };
  }
};
