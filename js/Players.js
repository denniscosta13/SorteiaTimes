export class Players {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()

    
  }


  checkedPlayers() {
    let arePlaying = []

    const checkboxes = document.querySelectorAll("input[type='checkbox']:checked")

    checkboxes.forEach((cbox) => {
      arePlaying = [cbox.value, ...arePlaying]
    })

    return arePlaying
  }

  splitTeams(array, teamSize) {
    let result = [];

  for (let i = 0; i < array.length; i += teamSize) {
    let chunk = array.slice(i, i + teamSize);
    result.push(chunk);
  }

  return result;


  }

  shuffleTeams(array, teamSize) {  
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    
    const teams = this.splitTeams(array,teamSize)
    
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


// view class

export class PlayersView extends Players {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')
    this.teams = this.root.querySelector('.teams')
    
    
    
    this.onadd()
    this.update()

    //chama os listeners do modal
    this.modalListeners()
  }

  modalListeners() {
    // // Sortear times
    
    const modal = this.root.querySelector('.modal')
    
    this.root.querySelector('#btn-sortear').onclick = () => {
      this.removeAllPlayers()
      
      let teamSize = Number(this.root.querySelector('#teamsize').value)
      
      const isEmpty = this.entries.length <= 0
      
      if(isEmpty) {
        alert('Insira os jogadores na lista.')
        return
      }

      const checkedPlayersArray = this.checkedPlayers()
      const shuffledArray = this.shuffleTeams(checkedPlayersArray,teamSize);
      
      this.updateTeams(shuffledArray)
      
      modal.style.display = "block"
    }

    this.root.querySelector('#btn-show').onclick = () => {
      //this.removeAllPlayers()
      modal.style.display = "block"
    }

    this.root.querySelector('.close').onclick = () => {
      //this.removeAllPlayers()
      modal.style.display = "none"
    }

    window.onclick = event => {
      if(event.target == modal) {
        //this.removeAllPlayers()
        modal.style.display = "none" 
      }
    }

  }

  createTeamList() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="name">
        <p class="jogador">Dennis</p> 
      </td>
    `

    return tr
  }

  updateTeams(array) {
    
    
    
    array.forEach( (team, teamIndex) => {
      const teamNumber = document.createElement('p')
      teamNumber.innerHTML = `<strong>Time 0${teamIndex+1}</strong>`
      this.teams.append(teamNumber)

      team.forEach( (player, index) => {
        const row = this.createTeamList()

        row.querySelector('.jogador').textContent = `${index+1}. ${player}`
  
        this.teams.append(row)

      })

      this.teams.append(document.createElement('br'))

    })
  }

  removeAllPlayers() {
    this.teams.querySelectorAll('tr').forEach( tr => {
      tr.remove()
    })

    this.teams.querySelectorAll('p').forEach( p => {
      p.remove()
    })

    this.teams.querySelectorAll('br').forEach( br => {
      br.remove()
    })

  }


  onadd() {
    const addButton = this.root.querySelector('.add button')
    const playerInput = this.root.querySelector('#player-input')
  

    addButton.onclick = () => {
      let { value } = this.root.querySelector('.add input')
      this.add(value)

      this.root.querySelector('.add input').value = ''
    }

    playerInput.onkeydown = (event) => {
      if(event.key === 'Enter')
      addButton.click()
    }
    
  }

  update() {
    this.removeAllTr()

    this.entries.forEach( user => {
      const row = this.createRow()

      row.querySelector('.name p').textContent = user
      row.querySelector('#cbox').value = user
      // row.querySelector('.playing input').checked = true


      // LISTENERS
        // // Excluir jogador
        row.querySelector('.remove').onclick = () => {
          const isOk = confirm('Deseja excluir esse jogador?')
  
          if(isOk) {
            this.delete(user)
          }
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
        <input id="cbox" type="checkbox" value="" checked>
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

    this.teams.querySelectorAll('tr').forEach( tr => {
      tr.remove
    })
  }

  
  
}