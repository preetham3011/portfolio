import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;

public class LibraryManagementSystem extends JFrame {
    private JTabbedPane tabbedPane;
    private JPanel bookDetailsPanel, bookListPanel;
    private JTextField titleField, authorField, isbnField, yearField;
    private JComboBox<String> genreComboBox;
    private JCheckBox availableCheckBox;
    private JTable bookTable;
    private DefaultTableModel tableModel;
    private JTextField searchField;
    
    private List<Book> books;

    public LibraryManagementSystem() {
        books = new ArrayList<>(); // Initialize the list of books
        
        // Set up main JFrame
        setTitle("Library Management System");
        setSize(800, 600);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // Create and set up MenuBar
        JMenuBar menuBar = createMenuBar();
        setJMenuBar(menuBar);

        // Create and add ToolBar
        JToolBar toolBar = createToolBar();
        add(toolBar, BorderLayout.NORTH);

        // Create and add TabbedPane
        tabbedPane = new JTabbedPane();
        bookDetailsPanel = createBookDetailsPanel();
        bookListPanel = createBookListPanel();

        tabbedPane.addTab("Book Details", bookDetailsPanel);
        tabbedPane.addTab("Book List", bookListPanel);
        add(tabbedPane, BorderLayout.CENTER);
    }

    // Create MenuBar with "File", "Edit", "Help" menus
    private JMenuBar createMenuBar() {
        JMenuBar menuBar = new JMenuBar();
        JMenu fileMenu = new JMenu("File");
        JMenu editMenu = new JMenu("Edit");
        JMenu helpMenu = new JMenu("Help");

        menuBar.add(fileMenu);
        menuBar.add(editMenu);
        menuBar.add(helpMenu);
        return menuBar;
    }

    // Create ToolBar with buttons for common actions
    private JToolBar createToolBar() {
        JToolBar toolBar = new JToolBar();
        JButton addBookButton = new JButton("Add Book");
        JButton removeBookButton = new JButton("Remove Book");
        JButton searchButton = new JButton("Search");

        toolBar.add(addBookButton);
        toolBar.add(removeBookButton);
        toolBar.add(searchButton);

        // Event Listeners
        addBookButton.addActionListener(e -> tabbedPane.setSelectedIndex(0)); // Switch to Book Details tab
        searchButton.addActionListener(e -> searchBooks()); // Search books

        return toolBar;
    }

    // Create Book Details Panel with text fields, combo box, and buttons
    private JPanel createBookDetailsPanel() {
        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(6, 2, 10, 10));

        JLabel titleLabel = new JLabel("Title:");
        titleField = new JTextField();
        JLabel authorLabel = new JLabel("Author:");
        authorField = new JTextField();
        JLabel isbnLabel = new JLabel("ISBN:");
        isbnField = new JTextField();
        JLabel yearLabel = new JLabel("Publication Year:");
        yearField = new JTextField();
        JLabel genreLabel = new JLabel("Genre:");
        genreComboBox = new JComboBox<>(new String[]{"Fiction", "Non-Fiction", "Science", "History"});
        availableCheckBox = new JCheckBox("Available");

        JButton addButton = new JButton("Add Book");
        JButton updateButton = new JButton("Update Book");

        panel.add(titleLabel);
        panel.add(titleField);
        panel.add(authorLabel);
        panel.add(authorField);
        panel.add(isbnLabel);
        panel.add(isbnField);
        panel.add(yearLabel);
        panel.add(yearField);
        panel.add(genreLabel);
        panel.add(genreComboBox);
        panel.add(availableCheckBox);
        panel.add(addButton);
        panel.add(updateButton);

        // Event Listener for Adding Books
        addButton.addActionListener(e -> addBook());
        // Event Listener for Updating Books
        updateButton.addActionListener(e -> updateBook());

        return panel;
    }

    // Create Book List Panel with table and search functionality
    private JPanel createBookListPanel() {
        JPanel panel = new JPanel();
        panel.setLayout(new BorderLayout());

        // Table columns
        String[] columns = {"Title", "Author", "ISBN", "Genre", "Available"};
        tableModel = new DefaultTableModel(columns, 0);
        bookTable = new JTable(tableModel);
        JScrollPane scrollPane = new JScrollPane(bookTable);

        // Search bar and button
        JPanel searchPanel = new JPanel();
        searchPanel.setLayout(new BorderLayout());
        searchField = new JTextField();
        JButton searchButton = new JButton("Search");

        searchPanel.add(searchField, BorderLayout.CENTER);
        searchPanel.add(searchButton, BorderLayout.EAST);

        // Add components to panel
        panel.add(searchPanel, BorderLayout.NORTH);
        panel.add(scrollPane, BorderLayout.CENTER);

        // Event Listener for Searching Books
        searchButton.addActionListener(e -> searchBooks());

        return panel;
    }

    // Method to Add a Book to the List
    private void addBook() {
        // Retrieve input from fields
        String title = titleField.getText();
        String author = authorField.getText();
        String isbn = isbnField.getText();
        String year = yearField.getText();
        String genre = genreComboBox.getSelectedItem().toString();
        boolean available = availableCheckBox.isSelected();

        // Create a new Book object and add to list
        Book newBook = new Book(title, author, isbn, genre, available);
        books.add(newBook);

        // Add book to the table
        tableModel.addRow(new Object[]{title, author, isbn, genre, available});
        
        // Clear input fields
        clearInputFields();
    }

    // Method to Update a Selected Book
    private void updateBook() {
        int selectedRow = bookTable.getSelectedRow();
        if (selectedRow != -1) {
            // Retrieve updated input from fields
            String title = titleField.getText();
            String author = authorField.getText();
            String isbn = isbnField.getText();
            String year = yearField.getText();
            String genre = genreComboBox.getSelectedItem().toString();
            boolean available = availableCheckBox.isSelected();

            // Update the book object in the list
            Book updatedBook = books.get(selectedRow);
            updatedBook.setTitle(title);
            updatedBook.setAuthor(author);
            updatedBook.setIsbn(isbn);
            updatedBook.setGenre(genre);
            updatedBook.setAvailable(available);

            // Update the table
            tableModel.setValueAt(title, selectedRow, 0);
            tableModel.setValueAt(author, selectedRow, 1);
            tableModel.setValueAt(isbn, selectedRow, 2);
            tableModel.setValueAt(genre, selectedRow, 3);
            tableModel.setValueAt(available, selectedRow, 4);

            // Clear input fields
            clearInputFields();
        } else {
            JOptionPane.showMessageDialog(this, "Please select a book to update.");
        }
    }

    // Method to Search Books
    private void searchBooks() {
        String searchText = searchField.getText().toLowerCase();
        tableModel.setRowCount(0); // Clear the table

        // Loop through the books list and add matching books to the table
        for (Book book : books) {
            if (book.getTitle().toLowerCase().contains(searchText) ||
                book.getAuthor().toLowerCase().contains(searchText) ||
                book.getIsbn().toLowerCase().contains(searchText)) {
                tableModel.addRow(new Object[]{
                    book.getTitle(),
                    book.getAuthor(),
                    book.getIsbn(),
                    book.getGenre(),
                    book.isAvailable()
                });
            }
        }
    }

    // Method to Clear Input Fields
    private void clearInputFields() {
        titleField.setText("");
        authorField.setText("");
        isbnField.setText("");
        yearField.setText("");
        genreComboBox.setSelectedIndex(0);
        availableCheckBox.setSelected(false);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            LibraryManagementSystem library = new LibraryManagementSystem();
            library.setVisible(true);
        });
    }
}
