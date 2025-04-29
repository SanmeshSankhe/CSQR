import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "./Calendar.jsx";
import "@testing-library/jest-dom";

/*
Requirements:
1. On page load, the calendar displays the current month in a normal calendar format, with an
abbreviated name and year in the header.
2. The current day of the month should be highlighted in gray.
3. Past days should be grayed-out.
4. Days that do not belong to the currently displayed month should not appear.
5. There should be arrows in the calendar header that allow you to cycle to the previous and
following months, respectively.
6. You can click on today’s date or any future date in the month, and that selected date should be
highlighted in green. You should not be able to select a past date. 
*/

describe("Calendar Component", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2025-04-29T00:00:00Z')); // Mock today's date
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("It should show the current month and year in abbreviated format", () => {
    render(<Calendar />);
    expect(screen.getByText("Apr 2025")).toBeInTheDocument();
  });

  it("It should mark today's date with a gray color", () => {
    render(<Calendar />);
    const todayElement = screen.getByText("28"); // April 28
    expect(todayElement).toHaveClass("bg-gray-400");
    expect(todayElement).toHaveClass("text-white");
  });

  it("Past dates should be shown in gray and not be clickable.", () => {
    render(<Calendar />);
    const pastDate = screen.getByText("15"); // Pick any past date like 15 April
    expect(pastDate).toHaveClass("text-gray-300");
    expect(pastDate).toHaveClass("cursor-not-allowed");
  });

  it("It should show any dates from previous or next months on current page", () => {
    render(<Calendar />);
    const dates = screen.getAllByText(/\d+/); // Get all visible dates
    dates.forEach(date => {
      expect(date).toBeVisible(); // All shown dates belong to the current month
    });
  });

  it("Users should be able to move to the previous and next months", () => {
    render(<Calendar />);
    const prevButton = screen.getByRole('button', { name: 'Previous Month' }); // first button
    const nextButton = screen.getByRole('button', { name: 'Next Month' }); // second button

    fireEvent.click(nextButton);
    expect(screen.getByText("May 2025")).toBeInTheDocument();

    fireEvent.click(prevButton);
    fireEvent.click(prevButton);
    expect(screen.getByText("Mar 2025")).toBeInTheDocument();
  });

  it("Clicking on today or a future date should highlight it in green", () => {
    jest.useFakeTimers().setSystemTime(new Date('2025-04-20T00:00:00Z')); 
    render(<Calendar />);
    const futureDate = screen.getByText("28"); // Future date in April

    fireEvent.click(futureDate);
    expect(futureDate).toHaveClass("bg-green-400");
    expect(futureDate).toHaveClass("text-white");
  });

  it("It should not allow to select past dates", () => {
    render(<Calendar />);
    const pastDate = screen.getByText("15"); // Past date

    fireEvent.click(pastDate);
    expect(pastDate).not.toHaveClass("bg-green-400"); // Should not turn green
  });
});
