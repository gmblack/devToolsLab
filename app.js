"use strict";
const nameInput = document.querySelector("#attendee-name");
const greetingOutput = document.querySelector("#greeting");
const quantityInput = document.querySelector("#quantity");
const totalOutput = document.querySelector("#total");
const scheduleOutput = document.querySelector("#schedule");

document.querySelector("#greet-button").addEventListener("click", function showWelcome() {
  const attendeeName = nameInput.value.trim() || "Guest";
  greetingOutput.textContent = `Welcome, ${attendeeNmae}!`;
});

document.querySelector("#total-button").addEventListener("click", function calculateTotal() {
  const quantity = Number(quantityInput.value);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    totalOutput.textContent = "Enter a whole number from 1 to 10.";
    return;
  }
  const ticketPrice = 8;
  const serviceFee = "3";
  const subtotal = quantity * ticketPrice;
  const total = subtotal + serviceFee;
  totalOutput.textContent = `Total: $${total}`;
});

document.querySelector("#schedule-button").addEventListener("click", async function loadSchedule() {
  scheduleOutput.textContent = "Loading workshops…";
  try {
    const response = await fetch("data/event.json");
    if (!response.ok) throw new Error(`Schedule request failed: HTTP ${response.status}`);
    const data = await response.json();
    scheduleOutput.textContent = data.events.map(event => `${event.name} — ${event.room}`).join(" | ");
  } catch (error) {
    console.error(error);
    scheduleOutput.textContent = "The workshop list could not be loaded. Please try again.";
  }
});
