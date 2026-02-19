(function () {
  var body = document.body;
  var sidebarToggle = document.getElementById("sidebar-toggle");
  var sidebarClose = document.getElementById("sidebar-close");
  var backdrop = document.getElementById("backdrop");
  var searchInput = document.getElementById("search-input");
  var postList = document.getElementById("post-list");
  var searchResults = document.getElementById("search-results");

  function closeSidebar() {
    body.classList.remove("sidebar-open");
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {
      body.classList.add("sidebar-open");
    });
  }

  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar);
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeSidebar);
  }

  function setActiveChip(category) {
    var chips = document.querySelectorAll(".chip");
    chips.forEach(function (chip) {
      chip.classList.toggle("active", chip.dataset.category === category);
    });
  }

  function filterPosts(category) {
    if (!postList) return;
    var cards = postList.querySelectorAll(".card");
    cards.forEach(function (card) {
      var categories = card.dataset.categories || "";
      var matches = category === "all" || categories.indexOf(category) !== -1;
      card.style.display = matches ? "flex" : "none";
    });
    setActiveChip(category);
  }

  var categoryParam = new URLSearchParams(window.location.search).get("category");
  if (categoryParam) {
    filterPosts(categoryParam);
  }

  var chips = document.querySelectorAll(".chip");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var category = chip.dataset.category;
      filterPosts(category);
      var url = new URL(window.location);
      if (category === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", category);
      }
      history.replaceState({}, "", url);
    });
  });

  if (window.SimpleJekyllSearch && searchInput && searchResults) {
    SimpleJekyllSearch({
      searchInput: searchInput,
      resultsContainer: searchResults,
      json: "/search.json",
      searchResultTemplate:
        '<article class="card">' +
        '<div class="card-meta">' +
        '<span class="tag">{categories}</span>' +
        '<span class="date">{date}</span>' +
        "</div>" +
        '<h3><a href="{url}">{title}</a></h3>' +
        '<p>{excerpt}</p>' +
        "</article>",
      noResultsText: "<p class=\"muted\">No matching posts.</p>",
    });

    searchInput.addEventListener("input", function (event) {
      var value = event.target.value.trim();
      if (value.length > 0) {
        postList.style.display = "none";
        searchResults.style.display = "grid";
      } else {
        postList.style.display = "grid";
        searchResults.style.display = "grid";
      }
    });
  }
})();
