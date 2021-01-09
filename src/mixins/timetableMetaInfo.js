export default {
  metaInfo() {
    if (this.isLoading || this.notFound || !this.timetable) {
      return {
        title: 'Not found | MyTerm',
      };
    }

    const { title, college } = this.timetable;
    const ogTitle = `${title} timetable`;
    const description = `The timetable for course ${title} of ${college}`;
    const keywords =
      'timetable, IT Sligo, college, course, Limerick IT, IT Sligo timetable, Limerick IT timetable, student timetables, education, university';

    return {
      title: `${title} · Timetable - MyTerm`,
      meta: [
        {
          name: 'og:title',
          content: ogTitle,
        },
        {
          name: 'description',
          content: `${title}, ${college}, ${description}, MyTerm.me allows users to view and save timetables of IT Sligo and Limerick IT`,
        },
        {
          name: 'og:description',
          content: description,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'keywords',
          content: keywords,
        },
      ],
    };
  },
};
