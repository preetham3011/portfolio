import tkinter as tk
from tkinter import messagebox

# Create the main window
root = tk.Tk()
root.title("Complete Registration Form")
root.geometry("300x250")  # Adjust size to accommodate title

# Function for form submission
def on_submit():
    name = entry_name.get()
    age = entry_age.get()
    event = event_var.get()
    if name and age and event:
        messagebox.showinfo("Registration Successful", f"Name: {name}\nAge: {age}\nEvent: {event}")
    else:
        messagebox.showerror("Error", "Please fill all fields.")

# Create a frame for padding
frame = tk.Frame(root, padx=10, pady=10)
frame.pack(padx=10, pady=10)

# Title label
title_label = tk.Label(frame, text="Event Registration Form", font=("Helvetica", 20))
title_label.grid(row=0, columnspan=2, pady=(0, 10))  # Add some space below the title

# Creating form fields
tk.Label(frame, text="Enter the Name of the candidate:",  font=("Helvetica", 10)).grid(row=1, column=0, padx=10, pady=5)
entry_name = tk.Entry(frame,  font=("Helvetica", 10))
entry_name.grid(row=1, column=1, padx=10, pady=5)

tk.Label(frame, text="Enter the Age of the candidate:",  font=("Helvetica", 10)).grid(row=2, column=0, padx=10, pady=5)
entry_age = tk.Entry(frame, font=("Helvetica", 10))
entry_age.grid(row=2, column=1, padx=10, pady=5)

tk.Label(frame, text="Select the Event:",  font=("Helvetica", 10)).grid(row=3, column=0, padx=10, pady=5)
event_var = tk.StringVar()
tk.OptionMenu(frame, event_var, "1.HACKATHON", "2. AI WORKSHOP", "3. PROGRAMMING CONTEST").grid(row=3, column=1, padx=10, pady=5)

# Submit button with improved styling
submit_button = tk.Button(frame, text="Submit",  font=("Helvetica", 10), command=on_submit, bg="#4CAF50", fg="white", padx=10, pady=5)
submit_button.grid(row=4, column=0, columnspan=2, pady=20)

# Start the main loop
root.mainloop()
