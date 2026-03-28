import Counter from "@/layouts/components/functional/Counter";
import { markdownify } from "@/lib/utils/textConverter";
import Button from "@/shortcodes/Button";
import type { CollectionEntry } from "astro:content";
import React, { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";

type Props = {
  plans: CollectionEntry<"pricing">["data"]["plans"];
};

const Plans = ({ plans }: { plans: Props["plans"] }) => {
  const [checked, setCheck] = useState(false);

  return (
    <section className="section pt-0">
      <div className="container">
        <div
          className="flex items-center justify-center mb-10"
          data-aos="fade-up-sm"
        >
          <label className="text-xl" id="monthly">
            Monthly
          </label>

          <label className="relative inline-flex items-center cursor-pointer mx-3 group">
            <input
              onChange={(e) => setCheck(e.target.checked)}
              type="checkbox"
              className="sr-only peer"
              checked={checked}
            />
            <div className="w-[70px] h-[34px] border-border bg-transparent border rounded-full peer peer-checked:after:left-[95%] peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1 after:bg-text-light after:rounded-full after:h-[24px] after:w-[24px] after:transition-all scale-100 peer-checked:active:after:scale-75 peer-active:after:scale-75"></div>
          </label>

          <label className="text-xl" id="annually">
            Yearly
          </label>
        </div>
        <div
          className="row justify-center mx-auto border border-text/20 rounded-lg bg-gradient"
          data-aos="fade-up-sm"
        >
          {plans.packs.map((p, i: number) => (
            <div
              key={i}
              className="col-12 lg:col-6 max-lg:border-b max-lg:last:border-b-0 border-text/20 lg:border-r lg:last:border-r-0"
            >
              <div className="p-7 h-full">
                <div>
                  <p
                    dangerouslySetInnerHTML={{ __html: markdownify(p.name) }}
                    className="text-xl text-text-light"
                    data-aos="fade-up-sm"
                  />

                  <h3 className="ml-3" data-aos="fade-up-sm">
                    <Counter
                      count={
                        checked
                          ? p?.price?.yearly_price
                          : p?.price?.monthly_price
                      }
                      duration={0.8}
                      className="max-md:h1"
                    />
                  </h3>

                  <p
                    className="text-base mb-8"
                    dangerouslySetInnerHTML={{
                      __html: markdownify(p.duration),
                    }}
                    data-aos="fade-up-sm"
                  />

                  <p
                    className="text-base mb-8"
                    dangerouslySetInnerHTML={{
                      __html: markdownify(p.description),
                    }}
                    data-aos="fade-up-sm"
                  />
                </div>

                {p.button.enable && (
                  <div className="mb-8" data-aos="fade-up-sm">
                    <Button link={p.button.link} label={p.button.label} />
                  </div>
                )}

                <ul>
                  <p
                    className="text-xl text-text-light mb-5"
                    dangerouslySetInnerHTML={{
                      __html: markdownify(p.feature.title),
                    }}
                    data-aos="fade-up-sm"
                  />
                  {p.feature.points.map((point, j: number) => (
                    <li
                      key={j}
                      className="flex items-center mb-4 last:mb-0"
                      data-aos="fade-up-sm"
                      data-aos-delay={j * 50}
                    >
                      <IoIosCheckmark className="p-0 border rounded-full border-text/20" />
                      <p
                        className="text-base ml-3"
                        dangerouslySetInnerHTML={{ __html: markdownify(point) }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
