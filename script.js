document.addEventListener("DOMContentLoaded", () => {
    // Set last updated date
    const now = new Date()
    const options = { year: "numeric", month: "long", day: "numeric" }
    document.getElementById("last-updated").textContent = now.toLocaleDateString("en-US", options)
  
    // Smooth scrolling for navigation links
    document.querySelectorAll("nav a").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        })
      })
    })
  
    // Edit functionality for name and email
    const nameElement = document.getElementById("applicant-name")
    const emailElement = document.getElementById("applicant-email")
  
    makeEditable(nameElement)
    makeEditable(emailElement)
  
    function makeEditable(element) {
      element.addEventListener("click", function () {
        const currentValue = this.textContent
        const input = document.createElement("input")
        input.value = currentValue
        input.className = "edit-input"
  
        this.parentNode.replaceChild(input, this)
        input.focus()
  
        input.addEventListener("blur", function () {
          const span = document.createElement("span")
          span.id = element.id
          span.textContent = this.value
          this.parentNode.replaceChild(span, this)
          makeEditable(span)
  
          // Save to localStorage
          localStorage.setItem(element.id, this.value)
        })
  
        input.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            this.blur()
          }
        })
      })
  
      // Load from localStorage if available
      const savedValue = localStorage.getItem(element.id)
      if (savedValue) {
        element.textContent = savedValue
      }
    }
  
    // Word counter for limited sections
    function countWords(text) {
      return text.trim().split(/\s+/).length
    }
  
    // Initial word count
    document.getElementById("count-1").textContent = countWords(
      document.querySelector("#interest-app-inventor .answer p").textContent,
    )
    document.getElementById("count-2").textContent = countWords(
      document.querySelector("#interest-programming .answer p").textContent,
    )
  
    // Add scroll to top button
    const scrollButton = document.createElement("button")
    scrollButton.innerHTML = "↑"
    scrollButton.className = "scroll-top"
    scrollButton.style.position = "fixed"
    scrollButton.style.bottom = "20px"
    scrollButton.style.right = "20px"
    scrollButton.style.width = "50px"
    scrollButton.style.height = "50px"
    scrollButton.style.borderRadius = "50%"
    scrollButton.style.backgroundColor = "var(--primary-color)"
    scrollButton.style.color = "white"
    scrollButton.style.border = "none"
    scrollButton.style.fontSize = "20px"
    scrollButton.style.cursor = "pointer"
    scrollButton.style.display = "none"
    scrollButton.style.zIndex = "1000"
    document.body.appendChild(scrollButton)
  
    scrollButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollButton.style.display = "block"
      } else {
        scrollButton.style.display = "none"
      }
    })
  })
  
  