import React, { useEffect } from "react";
import WOW from "wowjs";

const Introduce = () => {
  useEffect(() => {
    new WOW.WOW().init();
  });
  return (
    <div className="introduce wow fadeInRight" data-wow-duration="1.5s">
      <h4>Giới thiệu về công ty</h4>
      <p>
        PRAMS, the Pregnancy Risk Assessment Monitoring System, is a
        surveillance project of the Centers for Disease Control and Prevention
        (CDC) and health departments. Developed in 1987, PRAMS collects
        jurisdiction-specific, population-based data on maternal attitudes and
        experiences before, during, and shortly after pregnancy. PRAMS
        surveillance currently covers about 81% of all U.S. births. PRAMS
        provides data not available from other sources. PRAMS data are used by
        researchers to investigate emerging issues in the field of reproductive
        health and by state, territory, and local governments to plan and review
        programs and policies aimed at reducing health problems among mothers
        and babies.
      </p>
    </div>
  );
};

export default Introduce;
