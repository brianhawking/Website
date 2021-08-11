
// override bootstrap alert so it can display again
var encryptionSuccessful = document.getElementById("encryption-successful");
encryptionSuccessful.querySelector("button[data-hide]").addEventListener("click", function() {
     encryptionSuccessful.style.display = "none";
});

// override bootstrap alert so it can display again
var encryptionFailed = document.getElementById("encryption-failed");
encryptionFailed.querySelector("button[data-hide]").addEventListener("click", function() {
     encryptionFailed.style.display = "none";
     console.log("Firing");
});

// override bootstrap alert so it can display again
var decryptionSuccessful = document.getElementById("decryption-successful");
decryptionSuccessful.querySelector("button[data-hide]").addEventListener("click", function() {
     decryptionSuccessful.style.display = "none";
});

// override bootstrap alert so it can display again
var decryptionFailed = document.getElementById("decryption-failed");
decryptionFailed.querySelector("button[data-hide]").addEventListener("click", function() {
     decryptionFailed.style.display = "none";
     console.log("Firing");
});


