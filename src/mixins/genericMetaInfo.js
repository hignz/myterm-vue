export default {
  metaInfo() {
    if (this.isLoading) {
      return {};
    }

    return {
      title: `${this.$route.name} - MyTerm`,
      meta: [
        {
          name: 'description',
          content:
            'MyTerm.me is a service for students of the IT Sligo and Limerick IT that provides access to student timetables, save functionality and quick access to useful resourses such as student email, Moodle and room bookings.',
        },
        {
          name: 'keywords',
          content:
            'timetable, IT Sligo, college, course, Limerick IT, IT Sligo timetable, Limerick IT timetable, student timetables, education, university',
        },
      ],
    };
  },
};
