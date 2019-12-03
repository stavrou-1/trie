// Trie constructor
function Trie(letter = '') {
    this.value = letter;
    this.children = {};
    this.isWord = false;
}
// Trie Methods
Trie.prototype = {
    add: function(word, node = this) {
        for (const letter of word) {
            // Here we check if node.children[letter] already exists
            // if it does we set each letter as a child node of its parent
            if (node.children[letter]) {
                node = node.children[letter];
            } else {
                // else the letters do not exist yet so we need to create
                // a new parent node and trickle down
                const newNode = new Trie(letter);
                node.children[letter] = newNode;
                node = newNode;
            }
        }
      // after letter nodes are added we set isWord to true
      // keep in mind that node.children is our current node
      node.isWord = true;
    },
    find: function(word, node = this) {
        let value = ''
        for (const letter of word) {
            if (node.children[letter]) {
                node = node.children[letter];
                value += letter;
            }
        }
        return value === word ? node : null;
    },
    remove: function(word = '', node = this) {
        if (!word) {
            return null;
        }
        const chain = [];
  
        // traverse down trie
        for (const letter of word) {
            if (node.children[letter]) {
                chain.push(node) // we want all nodes accessible in chain so we can move backwards and remove dangling nodes
                node = node.children[letter]
            } else {
                return null; // word is not in trie
            }
        }
  
        if (Object.keys(node.children).length) { // if any children, we should only change isWord flag
            node.isWord = false;
            return node;
        }
  
        // Zero children in node.
        // continue until we hit a breaking condition
        let child = chain.length ? chain.pop() : null; // whatever node was
        let parent = chain.length ? chain.pop() : null; // if node has parent
        while (true) {
        child && parent && delete parent.children[child.value]; // remove child;

        if (Object.keys(parent.children).length || !chain.length) { // if more children or chain is empty, we're done!
            node.isWord = false;
            return node;
        }
        // otherwise, we have no more children for our parent and we should keep deleting nodes
        // our next parent is what we pop from the chain
        // our child is what our parent was.
        child = parent;
        parent = chain.pop()
        }
    },
    findWords: function(value = '', node = this.find(value), words = []) {
        Object.values(node.children).forEach((child) => {
            if (child.isWord) {
                words.push(value + child.value);
            }
            child.findWords(value + child.value, child, words);
      });
      return words;
    },
    hasWord: function(word) {
        const node = this.find(word);
        return !!node && node.isWord; 
    }
}
  
  
  console.clear();
  var trieOne = new Trie();
  trieOne.add("tomato");
  trieOne.add("tomatas");
  trieOne.add("pan");
  trieOne.add("pizza");
  
  trieOne.remove("tomatas")
  
  console.log(JSON.stringify(trieOne,null,2))
