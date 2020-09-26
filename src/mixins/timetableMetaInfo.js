export default {
  metaInfo() {
    if (this.isLoading || this.notFound || !this.timetable) {
      return {
        title: 'Not found | MyTerm',
      };
    }

    const { title, college } = this.timetable;
    const defaultKeywords = ['Timetables, IT Sligo, Limerick IT'];
    const description = `The timetable for course ${title} of ${college}`;
    const ogTitle = `${title} timetable`;

    return {
      title: `${title} · Timetable - MyTerm`,
      meta: [
        {
          name: 'description',
          content: `${title}, ${college}, ${description}, MyTerm.me allows users to view and save timetables of IT Sligo and Limerick IT`,
        },
        {
          name: 'keywords',
          content: defaultKeywords,
        },
        {
          name: 'og:description',
          content: description,
        },
        {
          name: 'og:title',
          content: ogTitle,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ],
    };
  },
};
