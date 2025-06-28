import { describe, it, expect, beforeAll, vi } from 'vitest'
import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import Herosection from '@/components/HeroSection.vue'

// Configuration de i18n pour les tests
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      hero: {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        cta: 'Test CTA'
      }
    },
    fr: {
      hero: {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        cta: 'Test CTA'
      }
    }
  }
});

describe("HeroSection", () => {
    const wrapper = mount(Herosection, {
        global: {
            plugins: [i18n] 
        }
    });

    it("Should render correctly", () => {
        expect(wrapper.exists()).toBe(true)
    });

    it("should display the title correctly", () =>{
      const title = wrapper.find("h1");
      expect(title.exists()).toBe(true);
      expect(title.text()).toContain('Test Title');    
    })

    it("Should render the router link correctly and be clickable", () =>{
      const title = wrapper.find("RouterLink");
      expect(title.exists()).toBe(true);
      expect(title.text()).toContain('Test CTA');
    })

it("should contain the svg", () =>{
  const svg = wrapper.find("svg");
  expect(svg.exists()).toBe(true)
})

})