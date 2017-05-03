( function( $ ) {

    'use strict';

    $( '#contact-form' ).submit( function( event ) {

        $( '#contact-success' ).fadeOut();
        $( '#contact-error' ).fadeOut();

        event.preventDefault();

        var dataJson = $( this ).serialize();

        $.ajax( {
            type: 'POST',
            url: 'php-mail/mail.php',
            data: dataJson,
            dataType: 'json',
            success: function( contact ) {
                // contact.successMsg
                // contact.errorMsg

                if( contact.successMsg ) {

                    $( '#contact-success > span' ).html( contact.successMsg );
                    $( '#contact-success' ).fadeIn();
                    $( '#contact-form' ).find( 'input[type=text], textarea' ).val( '' );

                } else if( contact.errorMsg ) {

                    $( '#contact-error > span' ).html( contact.errorMsg );
                    $( '#contact-error' ).fadeIn();
                }
            }
        } );

    } );


} ) ( jQuery );