<template>
  <div id="app">
    <Particles id="tsparticles" :options="options" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['darkMode']),
    options() {
      return {
        backgroundMode: {
          enable: true,
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ['#41D1AB', '#72DDF7', '#EF596F', '#009DF8', '#F9F871'],
          },
          number: {
            value: 0,
          },
          collisions: {
            enable: false,
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.7,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: true,
            },
          },
          size: {
            value: 4,
            random: {
              enable: true,
              minimumValue: 1,
            },
            animation: {
              enable: true,
              speed: 0.1,
              minimumValue: 0.1,
              sync: false,
            },
          },
          life: {
            duration: {
              sync: false,
              value: 0.9,
            },
            count: 1,
          },
          move: {
            enable: true,
            gravity: {
              enable: false,
            },
            speed: 20,
            direction: 'none',
            random: true,
            straight: false,
            outMode: 'destroy',
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onHover: {
              enable: false,
              mode: 'repulse',
              parallax: {
                enable: false,
                force: 60,
                smooth: 10,
              },
            },
            onClick: {
              enable: true,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 0.8,
            },
            repulse: {
              distance: 200,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        detectRetina: true,
        emitters: {
          direction: 'none',
          life: {
            count: 0,
            duration: 0.1,
            delay: 0.1,
          },
          rate: {
            delay: 0.1,
            quantity: 100,
          },
          size: {
            width: 0,
            height: 0,
          },
        },
      };
    },
  },
};
</script>

<style>
#tsparticles {
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: 0;
  overflow: hidden;
}
</style>
