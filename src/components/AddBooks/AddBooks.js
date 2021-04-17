 import React from 'react';

const AddBooks = () => {
    return (
        <div>
            <input type="text" class="form-control" id="book" placeholder="book name" />
            <br/>
            <input type="text" class="form-control" id="author" placeholder="author" />
            <br/>
            <input type="number" class="form-control" id="price" placeholder="price" />
        </div>
    );
};

export default AddBooks;