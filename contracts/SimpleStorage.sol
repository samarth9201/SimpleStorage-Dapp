pragma solidity >= 0.4.0 < 0.7.0;

contract SimpleStorage{

    string name;
    uint age;

    // Constructor to initialize name and age
    constructor() public {
        name = "";
        age = 0;
    }

    // A function to store value in name and age. _name and _age is passed as parameter which is assigned to name and age respectively
    function set(string memory _name, uint _age) public {
        name = _name;
        age = _age;
    }

    // Function to return name and age
     function get() public view returns(string memory, uint){
        return (name,age);
    }
}