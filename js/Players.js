export class Players {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }


  splitTeams(array, teamSize) {
    let result = [];

  for (let i = 0; i < array.length; i += teamSize) {
    let chunk = array.slice(i, i + teamSize);
    result.push(chunk);
  }

  return result;


  }

  shuffleTeams(array) {  
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    
    const teams = this.splitTeams(array,5)
    
    return teams


  }
  
  load() {
    this.entries = JSON.parse(localStorage.getItem('@sorteiaTimes-players:')) || []
  }

  save() {
    localStorage.setItem('@sorteiaTimes-players:', JSON.stringify(this.entries))
  }
  
  add(playername) {
    try {
      const playerExists = this.entries.find(entry => entry === playername) 
      const emptyEntry = playername === ''

      if(playerExists) {
        throw new Error('Jogador já cadastrado.')

      } else if (emptyEntry) {
        throw new Error('Insira um nome antes.')
      }

      
      
      this.entries = [playername, ...this.entries]
  
      this.update()
      this.save()

    } catch(error) {
      alert(error.message)
    }

  }

  delete(user) {
    this.entries = this.entries
    .filter(entry => entry !== user)

    this.update()
    this.save()
  }
}

export class PlayersView extends Players {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.onadd()
    this.update()
  }

  onadd() {
    const addButton = this.root.querySelector('.add button')

    addButton.onclick = () => {
      let { value } = this.root.querySelector('.add input')
      this.add(value)

      this.root.querySelector('.add input').value = ''
    }
  }

  update() {
    this.removeAllTr()

    this.entries.forEach( user => {
      const row = this.createRow()

      row.querySelector('.name p').textContent = user
      // row.querySelector('.playing input').checked = true

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Deseja excluir esse jogador?')

        if(isOk) {
          this.delete(user)
        }
      }

      this.root.querySelector('#btn-sortear').onclick = () => {
        const isEmpty = this.entries.length <= 0

        if(isEmpty) {
          return
        }

        this.shuffleTeams(this.entries)
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="name">
        <p>Dennis</p>
      </td>
      <td class="playing">
        <input type="checkbox" name="" id="">
      </td>
      <td class="goalkeeper">
        <input type="checkbox" name="" id="">
      </td>
      <td class="remove">
        <button>&times;</button>
      </td>
    `

    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
  }
}