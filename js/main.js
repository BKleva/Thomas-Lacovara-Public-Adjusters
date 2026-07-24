/* Thomas Lacovara & Associates — shared behavior */
(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Duplicate the review ticker track so the loop is seamless */
  var track = document.querySelector(".ticker-track");
  if (track) {
    Array.prototype.slice.call(track.children).forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }

  /* Gallery filtering */
  var filterBar = document.querySelector(".filter-bar");
  if (filterBar) {
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      var cat = btn.dataset.filter;
      document.querySelectorAll(".gallery-item").forEach(function (item) {
        item.classList.toggle("hidden", cat !== "all" && item.dataset.category !== cat);
      });
    });
  }

  /* Testimonial slider */
  var testiQuote = document.getElementById("testi-quote");
  var testiAttr = document.getElementById("testi-attr");
  var testiDots = document.getElementById("testi-dots");
  if (testiQuote && testiAttr && testiDots) {
    var testimonials = [
      { quote: "Thank you, Thomas Lacovara, for all your hard work and help settling this large and complicated insurance claim, and for all your professional help with rebuilding the medical center. You came highly recommended and you earned that reputation.", name: "Dr. Groch", org: "Mainland Medical Center, Northfield" },
      { quote: "We were having a difficult time with the insurance company until you stepped in and made sure we got everything we were entitled to. Thank you for all your effort and hard work.", name: "Jack Fox", org: "Executive Director, JCC Margate" },
      { quote: "You and your team took us through the difficult process of settling our fire department's claim with patience and total professionalism.", name: "Egg Harbor Twp. Firefighters", org: "Bargaintown Fire Department" },
      { quote: "I cannot thank this company enough. I had a flood claim and a fire claim, and they handled both of them like true professionals.", name: "Carol Austin", org: "Mainland High School" },
      { quote: "Thomas Lacovara and his team were a guiding light in one of the darkest days of our lives. We are forever grateful.", name: "James & Yvonne Knox", org: "School Principal, Atlantic City" },
      { quote: "Thomas Lacovara and Associates are true professionals and experts in their field. I recommend them without hesitation.", name: "Sandy & Paul D'Amato", org: "Trial Attorney" },
      { quote: "Hiring Thomas Lacovara and Associates was the best thing I've ever done when it came to settling my insurance claim.", name: "Norma Schick", org: "Homeowner" },
      { quote: "Thomas Lacovara and Associates worked relentlessly to get me everything I was entitled to under my policy.", name: "Kevin Dixion", org: "Licensed Engineer, Galloway" },
      { quote: "They are fantastic. If you have a major loss or insurance claim, this company has a proven track record of results.", name: "Tom Kimball", org: "Professional Realtor" }
    ];
    var idx = 0;
    var timer;

    testimonials.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show testimonial " + (i + 1));
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", function () { show(i, true); });
      testiDots.appendChild(dot);
    });

    function show(i, userTriggered) {
      idx = i;
      var t = testimonials[idx];
      testiQuote.textContent = "“" + t.quote + "”";
      testiAttr.innerHTML = t.name + " <span>" + t.org + "</span>";
      Array.prototype.forEach.call(testiDots.children, function (d, di) {
        d.classList.toggle("active", di === idx);
      });
      if (userTriggered) restart();
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { show((idx + 1) % testimonials.length); }, 6000);
    }
    restart();
  }

  /* Reveal on scroll */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* Footer year */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
