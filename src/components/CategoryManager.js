import React, { useState } from 'react';

function CategoryManager({ categories, setCategories }) {
  const [newCategory, setNewCategory] = useState({ name: '', color: '#ADD8E6' });

  const addCategory = () => {
    if (newCategory.name.trim()) {
      const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
      setCategories([...categories, { id: newId, ...newCategory }]);
      setNewCategory({ name: '', color: '#ADD8E6' });
    }
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const updateCategory = (id, field, value) => {
    setCategories(categories.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  return (
    <div className="form-section">
      <h2>Categories</h2>
      <div className="category-list">
        {categories.map(category => (
          <div key={category.id} className="category-item">
            <input
              type="text"
              value={category.name}
              onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
              className="category-name-input"
            />
            <input
              type="color"
              value={category.color}
              onChange={(e) => updateCategory(category.id, 'color', e.target.value)}
              className="color-picker"
            />
            <button onClick={() => deleteCategory(category.id)} className="delete-btn">×</button>
          </div>
        ))}
      </div>
      <div className="add-category">
        <input
          type="text"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          placeholder="Category name"
        />
        <input
          type="color"
          value={newCategory.color}
          onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
        />
        <button onClick={addCategory}>Add Category</button>
      </div>
    </div>
  );
}

export default CategoryManager;
