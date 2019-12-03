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
            // Here we check if node.children[letter] already exists (or check if the letter)
            // already exists as a key.
            // if it does we set the next letter as the child of the matching key.
            if (node.children[letter]) {
                node = node.children[letter];
            } else {
                // else the letters do not exist yet so we need to create
                // a new node and trickle down
                const newNode = new Trie(letter);
                node.children[letter] = newNode;
                node = newNode;// node keeps getting reassigned to each letter. Ending
                // in the last letter of the word.
            }
        }
      // After letter nodes are added we set isWord to true on the LAST
      // letter (node). Keep in mind that node keeps getting reassigned to the next letter
      // until we are finished looping. So the word `shark` would have `k` finally set to
      // .isWord = true since it is the last letter of our word.
      node.isWord = true;
    },
    find: function(word, node = this) {
        let value = ''
        for (const letter of word) {
            // check if letter already exists as a key
            if (node.children[letter]) {
                // and assign node to each letter of the word as a child of the previous.
                node = node.children[letter];
                // value concatenates to form the entire word. so `a` + `p` + `p` + `l` + `e`
                // will give us apple as the final `value`.
                value += letter;
            }
        }
        // finally we check if value equals the word we passed in
        // if it does we return the final node (or final letter). So with `apple`
        // we would return the node `e`.
        return value === word ? node : null;
    },
    remove: function(word = '', node = this) {
        // if word does not exist - we exit with a return statement
        if (!word) {
            return null;
        }
        const chain = [];
        // chain will be used to store the letters of our word.
  
        // traverse down trie
        for (const letter of word) {
            // if letter is found as a `key` in node.children...
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
        
        // if chain has length we set child to the last node and pop it off.
        let child = chain.length ? chain.pop() : null; // whatever node was
        
        // if chain has length we set parent to the last node and pop it off.
        let parent = chain.length ? chain.pop() : null; // if node has parent
        while (true) {
        child && parent && delete parent.children[child.value]; // remove child;
        // short circuit evaluation. Essentiall equivalent to:
        /*
            if (child && parent) {
                delete parent.children[child.value]
            }
        */

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
