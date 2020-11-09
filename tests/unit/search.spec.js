import {shallowMount} from "@vue/test-utils";
import Search from "@/components/Search.vue";

describe("Chart.vue", () => {
  it("check input text", () => {
    const wrapper = shallowMount(Search, {
      data: function() {
        return {
          searchInput: "US",
        }

      }
    });
    const inputTextBar = wrapper.find("input");
    expect(inputTextBar.element.value).toMatch("US");
  });
  it("check click button", () => {
    const wrapper = shallowMount(Search, {
      data: function() {
        return {
          searchInput: "Canada",
        }

      }
    });
    const searchButton = wrapper.find("button");
    searchButton.trigger("click");
    expect(wrapper.emitted().searchWithInput[0]).toEqual(["Canada"]);
  });
});
