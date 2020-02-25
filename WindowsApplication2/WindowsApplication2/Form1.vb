Public Class Form1

    Dim id As String = "X"
    Dim counter_jugadas As Integer = 0
    Dim xscore As Integer = 0
    Dim oscore As Integer = 0
    Dim final_juego As Boolean = False


    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        reiniciar_botones()
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click, Button2.Click, Button3.Click, Button4.Click, Button5.Click, Button6.Click, Button7.Click, Button8.Click, Button9.Click
        If radpvp.Checked = True Then

            seleccion_del_jugador(sender)
            verificar_ganador(id)
            switch()

        ElseIf radlvl1.Checked = True Then

            If id = "X" Then
                seleccion_del_jugador(sender)
                verificar_ganador(id)
                switch()
                
            End If

            If final_juego = False Then
                seleccion_maquina_nivel1()
                verificar_ganador(id)
                switch()

            End If


        ElseIf radlvl2.Checked = True Then
            If id = "X" Then
                seleccion_del_jugador(sender)
                verificar_ganador(id)
                switch()

            End If

            If final_juego = False Then
                seleccion_maquina_nivel2()
                verificar_ganador(id)
                switch()

            End If


        ElseIf radlvl3.Checked = True Then

            If id = "X" Then
                seleccion_del_jugador(sender)
                verificar_ganador(id)
                switch()

            End If

            If final_juego = False Then
                seleccion_maquina_nivel3()
                verificar_ganador(id)
                switch()

            End If

        Else
            MsgBox("ERROR : Selecciones Modo De Juego.", MsgBoxStyle.Critical, "Error")
        End If

    End Sub

    Private Sub switch()
        If id = "X" Then
            id = "O"
        Else
            id = "X"
        End If

        Label1.Text = id

    End Sub

    Private Sub seleccion_del_jugador(ByVal sender As Object)
        For Each opcion In FlowLayoutPanel1.Controls
            If TypeOf opcion Is Button Then
                If CType(opcion, Button).Name = CType(sender, Button).Name Then
                    CType(opcion, Button).Text = id
                    CType(opcion, Button).Enabled = False
                End If
            End If
        Next
    End Sub

    Private Sub seleccion_maquina_nivel1()
        'El nivel 1 tomara decisiones completamente al azar

        Dim numero As New Random

        While True And counter_jugadas < 9
            Dim seleccion_maquina As Integer = numero.Next(1, 10)

            Dim btns = Me.Controls.Find("button" & seleccion_maquina, True)
            If btns.Length > 0 Then
                If btns(0).Text = String.Empty Then

                    btns(0).Text = id
                    btns(0).Enabled = False

                    Exit While
                End If
            End If

        End While

    End Sub

    Private Sub seleccion_maquina_nivel2()

        'Prioridades 

        '1) Interrumpir Ganador
        '2) Hacer Movida 

        If block("X") = True Then

        Else
            seleccion_maquina_nivel1()
        End If




    End Sub

    Private Sub seleccion_maquina_nivel3()
        'Prioridades 

        '1) Ganar , Si es Posible
        '2) Interrumpir Ganador
        '3) Hacer Movida

        If block("O") = True Then

        Else
            If block("X") = True Then

            Else
                seleccion_maquina_nivel1()

            End If

        End If


    End Sub

    Private Function block(ByVal opcion As String)
        'bloqueo horizontal 
        Dim counter As Integer 'Conteo de X o 0 Encontrados.
        Dim empty As Integer   'Guarda Ultimo Espacio Vacio Encontrado


        For i As Integer = 1 To 7 Step 3 'LOOP Monitorea las Filas ... 1 , 4 , 7
            counter = 0
            For e As Integer = i To i + 2 'LOOP Monitorea los elementos en las filas. 123, 456 , 789
                Dim btns = Me.Controls.Find("button" & e, True)
                If btns.Length > 0 Then
                    If btns(0).Text = opcion Then
                        counter += 1
                    Else
                        empty = e
                    End If
                End If
            Next


            If counter = 2 Then
                Dim btns = Me.Controls.Find("button" & empty, True)
                If btns.Length > 0 Then
                    If btns(0).Text = String.Empty Then
                        btns(0).Text = id
                        btns(0).Enabled = False
                        Return True
                    End If
                End If
            End If

        Next

        'Bloqueo Vertical 

        For i As Integer = 1 To 3 'LOOP Monitorea las Columnas
            counter = 0
            For e As Integer = i To 9 Step 3 'loop Monitorea los elementos de las columnas.
                Dim btns = Me.Controls.Find("button" & e, True)
                If btns.Length > 0 Then
                    If btns(0).Text = opcion Then
                        counter += 1
                    Else
                        empty = e
                    End If
                End If
            Next

            If counter = 2 Then
                Dim btns = Me.Controls.Find("button" & empty, True)
                If btns.Length > 0 Then
                    If btns(0).Text = String.Empty Then
                        btns(0).Text = id
                        btns(0).Enabled = False
                        Return True
                    End If
                End If
            End If

        Next

        'Bloqueo Diagonales

        counter = 0
        For e As Integer = 1 To 9 Step 4
            Dim btns = Me.Controls.Find("button" & e, True)
            If btns.Length > 0 Then
                If btns(0).Text = opcion Then
                    counter += 1
                Else
                    empty = e
                End If
            End If
        Next
        If counter = 2 Then
            Dim btns = Me.Controls.Find("button" & empty, True)
            If btns.Length > 0 Then
                If btns(0).Text = String.Empty Then
                    btns(0).Text = id
                    btns(0).Enabled = False
                    Return True
                End If
            End If
        End If

        counter = 0
        For e As Integer = 7 To 3 Step -2
            Dim btns = Me.Controls.Find("button" & e, True)
            If btns.Length > 0 Then
                If btns(0).Text = opcion Then
                    counter += 1
                Else
                    empty = e
                End If
            End If
        Next
        If counter = 2 Then
            Dim btns = Me.Controls.Find("button" & empty, True)
            If btns.Length > 0 Then
                If btns(0).Text = String.Empty Then
                    btns(0).Text = id
                    btns(0).Enabled = False
                    Return True
                End If
            End If
        End If

        Return False

    End Function

    Private Sub verificar_ganador(ByVal x As String)
        counter_jugadas += 1

        Dim counter As Integer = 0
        'Verificar Horizontal
        For i As Integer = 1 To 7 Step 3
            counter = 0
            For e As Integer = i To i + 2
                Dim btns = Me.Controls.Find("button" & e, True)
                If btns.Length > 0 Then
                    If btns(0).Text = x Then
                        btns(0).BackColor = Color.PowderBlue
                        counter += 1
                    End If
                End If
            Next
            If counter = 3 Then

                mostrar_ganador(x)
                Exit Sub
            Else
                reiniciar_colores_botones()

            End If
        Next

        'Verificar Vertical 
        For i As Integer = 1 To 3
            counter = 0
            For e As Integer = i To 9 Step 3
                Dim btns = Me.Controls.Find("button" & e, True)
                If btns.Length > 0 Then
                    If btns(0).Text = x Then
                        btns(0).BackColor = Color.PowderBlue
                        counter += 1
                    End If
                End If
            Next
            If counter = 3 Then
                mostrar_ganador(x)
                Exit Sub
            Else
                reiniciar_colores_botones()
            End If
        Next

        'Verificar Diagonales

        counter = 0
        For e As Integer = 1 To 9 Step 4
            Dim btns = Me.Controls.Find("button" & e, True)
            If btns.Length > 0 Then
                If btns(0).Text = x Then
                    btns(0).BackColor = Color.PowderBlue
                    counter += 1
                End If
            End If
        Next
        If counter = 3 Then
            mostrar_ganador(x)
            Exit Sub
        Else
            reiniciar_colores_botones()
        End If

        counter = 0
        For e As Integer = 7 To 3 Step -2
            Dim btns = Me.Controls.Find("button" & e, True)
            If btns.Length > 0 Then
                If btns(0).Text = x Then
                    btns(0).BackColor = Color.PowderBlue
                    counter += 1
                End If
            End If
        Next
        If counter = 3 Then
            mostrar_ganador(x)
            Exit Sub
        Else
            reiniciar_colores_botones()
        End If

        If counter_jugadas = 9 Then
            MsgBox("Nadie Gano", MsgBoxStyle.Information, "INFORMACION")
        End If


    End Sub

    Private Sub mostrar_ganador(ByVal ganador As String)
        enable(False)
        final_juego = True
        MsgBox("GANO : " & ganador)
        If ganador = "X" Then
            xscore += 1
        Else
            oscore += 1
        End If
        lblx.Text = xscore
        lbl0.Text = oscore


    End Sub

    Private Sub enable(ByVal x As Boolean)
        For Each opcion In FlowLayoutPanel1.Controls
            If TypeOf opcion Is Button Then
                If x = False Then
                    CType(opcion, Button).Enabled = False
                Else
                    CType(opcion, Button).Enabled = True
                End If

            End If
        Next
    End Sub

    Private Sub reiniciar_botones()
        For Each opcion In FlowLayoutPanel1.Controls
            If TypeOf opcion Is Button Then
                CType(opcion, Button).Text = String.Empty
            End If
        Next
        reiniciar_colores_botones()

        counter_jugadas = 0
        Label1.Text = id

    End Sub

    Private Sub reiniciar_colores_botones()
        For Each opcion In FlowLayoutPanel1.Controls
            If TypeOf opcion Is Button Then
                CType(opcion, Button).BackColor = Color.White
            End If
        Next
    End Sub


    Private Sub Button10_Click(sender As Object, e As EventArgs) Handles Button10.Click
        reiniciar_botones()
        enable(True)
        final_juego = False

        If radlvl1.Checked = True And id <> "X" Then
            Button1_Click(Button1, New EventArgs())
        End If

        If radlvl2.Checked = True And id <> "X" Then
            Button1_Click(Button1, New EventArgs())
        End If

        If radlvl3.Checked = True And id <> "X" Then
            Button1_Click(Button1, New EventArgs())
        End If

    End Sub

    Private Sub Button11_Click(sender As Object, e As EventArgs) Handles Button11.Click
        xscore = 0
        oscore = 0
        lbl0.Text = oscore
        lblx.Text = xscore
    End Sub

    Private Sub Button12_Click(sender As Object, e As EventArgs) Handles Button12.Click
        Me.Close()

    End Sub

    Private Sub radlvl1_CheckedChanged(sender As Object, e As EventArgs) Handles radlvl1.CheckedChanged
        If radlvl1.Checked = True And id <> "X" Then
            Button1_Click(Button1, New EventArgs())
        End If
    End Sub

    Private Sub radpvp_CheckedChanged(sender As Object, e As EventArgs) Handles radpvp.CheckedChanged
        If radpvp.Checked = True Then

            enable(True)
            reiniciar_botones()
        End If

    End Sub

    
    Private Sub radlvl2_CheckedChanged(sender As Object, e As EventArgs) Handles radlvl2.CheckedChanged
        If radlvl2.Checked = True And id <> "X" Then
            Button1_Click(Button1, New EventArgs())
        End If
    End Sub

    Private Sub radlvl3_CheckedChanged(sender As Object, e As EventArgs) Handles radlvl3.CheckedChanged
       If radlvl3.Checked = True And id <> "X" Then
            Button1_Click(Button1, New EventArgs())
        End If
    End Sub
End Class
