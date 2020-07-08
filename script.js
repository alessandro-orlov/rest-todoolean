$(document).ready(
  function() {

    // Mostro la lista al caricamento della pagina
    getList();


    // ================= BUTTON CLICK ==========================
    // Al click Prendiamo il valore del campo input e lo appendiamo alla lista to do
    $('button.insert-task-btn').click(
      function() {
        // Error reset
        $('.insert-task input').removeClass('error');
        $('.empty-string-error').removeClass('visible');

        var valoreInput = $('input').val();
        if (valoreInput !== '') {
          addToList(valoreInput)

          // GET from API
          getList();

          $('input').val('');
        } else {
          // Error active
          $('.insert-task input').addClass('error');
          $('.empty-string-error').addClass('visible');
        }

    }); // END insert-task-btn click event


    // ============== KEYPRESS EVENT ============================
    // Keypress event
    $('.insert-task input').keypress(function(event) {
      if (event.which === 13 ) {
        // Error reset
        $('.insert-task input').removeClass('error');
        $('.empty-string-error').removeClass('visible');

        var valoreInput = $('input').val();
        if (valoreInput !== '') {
          addToList(valoreInput)

          // GET from API
          getList();

          $('input').val('');
        } else {
          // Error active
          $('.insert-task input').addClass('error');
          $('.empty-string-error').addClass('visible');
        }
      }
    }); // End keypress event


    // ================ DELETE LIST ITEM =========================
    // Global click
    $(document).on('click', 'span.del-task', function() {

      var id = $(this).parent('li').attr('data-id');

      deleteItem(id)
    });

    // =============================================================
    // =================== FUNCTIONS ===============================

    // =================== addToList() =============================
    // POST to API function
    function addToList(valoreInput) {

      $.ajax(
        {
          url: "http://157.230.17.132:3022/todos",
          method:"POST",
          data: {
            text: valoreInput
          },
          success: function() {
            getList();

          },
          error: function() {
            console.log('errore addToList function')
          }
        }
      ); // End ajax call

    } // end function
    // --------------------------------------------------------------

    // ===================== getList() ==============================
    // GET from API
    function getList() {

      $.ajax(
        {
          url: "http://157.230.17.132:3022/todos",
          method:"GET",

          success: function(data) {
            var taskArray = data;

            printListItem(taskArray);

          },
          error: function() {
            console.log('errore getList function')
          }
        }
      ); // End ajax call

    } // end function
    // --------------------------------------------------------------


    // ================ printListItem() ==================================
    // printTask tamplate function
    function printListItem(taskArray) {

      resetList();

      // Compilo il tamplate
      // Fuori dal ciclo per risparmiare le risorse
      var source = $('#list-item-template').html();
      var template = Handlebars.compile(source);


      for (var i = 0; i < taskArray.length; i++) {
        var singleTask = taskArray[i]

        var context = {
          id: singleTask.id,
          text: singleTask.text
        };

        var html = template(context);
        $('.lista-to-do').append(html)
      } // fine ciclo for

    } // fine funzione
    // ---------------------------------------------------------------

    // =================== deleteItem() ==============================
    // DELETE from API
    function deleteItem(id) {

      $.ajax(
        {
          url: "http://157.230.17.132:3022/todos/" + id,
          method:"DELETE",

          success: function() {
            // Mostriamo il messaggio che l'elemento è stato eliminato con la classe .active
            $('.del-task-message').addClass('active').show();

            // Il messaggio sara visualizzato per 2.5s
            setTimeout(function() {
              $('.del-task-message').removeClass('active');
            },2500);

            getList();
          },
          error: function() {
            console.log('errore getList function')
          }
        }
      ); // End ajax call

    } // end function
    // --------------------------------------------------------------

    // ===================== resetList() ============================
    // reset list function
    function resetList() {
      $('.lista-to-do').html('')
    }
    // --------------------------------------------------------------

  });// END of document ready
