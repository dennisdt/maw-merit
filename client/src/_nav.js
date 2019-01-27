export default {
  items: [
    {
      title: true,
      name: 'Volunteer',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Rewards',
      url: '/rewards',
    },
    {
      name: 'Refer-A-Friend',
      url: '/referrals',
    },
    {
      name: 'Events',
      url: '/events',
    },
    {
      name: 'Workshop/Trainings',
      url: '/theme/colors',
    },
    {
      name: 'FAQs',
      url: '/theme/colors',
    },
    {
      title: true,
      name: 'Organization',
      wrapper: {            
        element: '',        
        attributes: {}        
      },
      class: ''
    },
    {
      name: 'Administrator',
      url: '/administrator',
    },
    {
      name: 'Analytics',
      url: '/dashboard',
    },
    {
      name: 'Events Manager',
      url: '/eventmanager',
    },
  ],
};
