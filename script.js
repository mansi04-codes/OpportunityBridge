document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("opportunities-container");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    
    let opportunitiesData = []; 

    function renderCards(data) {
        container.innerHTML = ""; 
        
        if (data.length === 0) {
            container.innerHTML = `<div class="col-12 text-center text-muted mt-4"><h5>No opportunities found.</h5></div>`;
            return;
        }

        // Retrieve saved applied statuses from the browser's local storage
        let appliedList = JSON.parse(localStorage.getItem("appliedOpportunities")) || [];

        data.forEach(item => {
            let badgeColor = "bg-secondary";
            if (item.category === "Internship") badgeColor = "bg-primary";
            if (item.category === "Hackathon") badgeColor = "bg-warning text-dark";
            if (item.category === "Government Scheme") badgeColor = "bg-success";

            // Check if this specific item's ID is in our saved list
            let isApplied = appliedList.includes(item.id);
            let buttonClass = isApplied ? "btn-success" : "btn-outline-primary";
            let buttonText = isApplied ? "Applied ✓" : "Mark as Applied";
            let cardOpacity = isApplied ? "opacity-75" : "opacity-100"; // Slightly dim the card if applied

            const cardHTML = `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm border-0 mt-2 ${cardOpacity}">
                        <div class="card-body">
                            <span class="badge ${badgeColor} mb-2">${item.category}</span>
                            <h5 class="card-title fw-bold">${item.title}</h5>
                            <p class="card-text text-muted small" style="min-height: 60px;">${item.description}</p>
                            <hr>
                            <p class="card-text mb-1 fw-medium" style="font-size: 0.9rem;">
                                🎯 Eligibility: <span class="fw-normal">${item.eligibility}</span>
                            </p>
                            <p class="card-text text-danger" style="font-size: 0.9rem;">
                                ⏳ Deadline: <strong>${item.deadline}</strong>
                            </p>
                        </div>
                        <div class="card-footer bg-white border-0 pb-3 pt-0 d-flex gap-2">
                            <a href="${item.apply_link}" target="_blank" class="btn btn-outline-dark w-50 fw-medium">View Link</a>
                            <button onclick="toggleAppliedStatus(${item.id})" class="btn ${buttonClass} w-50 fw-medium">${buttonText}</button>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += cardHTML;
        });
    }

    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredData = opportunitiesData.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                                  item.description.toLowerCase().includes(searchTerm);
            
            const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        renderCards(filteredData);
    }

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            opportunitiesData = data;
            renderCards(opportunitiesData); 
        })
        .catch(error => console.error("Error loading the data:", error));

    searchInput.addEventListener("input", applyFilters);
    categoryFilter.addEventListener("change", applyFilters);

    // Make the filter function available globally so the inline onclick button can trigger it
    window.forceReRender = applyFilters;
});

// Global function to handle clicking the "Mark as Applied" button
window.toggleAppliedStatus = function(itemId) {
    // 1. Get the current list from local storage
    let appliedList = JSON.parse(localStorage.getItem("appliedOpportunities")) || [];
    
    // 2. Add or remove the ID from the list
    if (appliedList.includes(itemId)) {
        // If it's already in the list, remove it (User clicked "Applied ✓" to undo)
        appliedList = appliedList.filter(id => id !== itemId);
    } else {
        // If it's not in the list, add it
        appliedList.push(itemId);
    }
    
    // 3. Save the new list back to local storage
    localStorage.setItem("appliedOpportunities", JSON.stringify(appliedList));
    
    // 4. Refresh the UI to show the green button
    window.forceReRender();
};